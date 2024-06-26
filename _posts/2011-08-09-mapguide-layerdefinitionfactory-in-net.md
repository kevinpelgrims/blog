---
layout: post
title: "MapGuide – LayerDefinitionFactory in .NET"
date: 2011-08-09 14:29:22
tags: ["gis"]
---
<img style="float:left;margin-left:5px;margin-right:5px;" title="Autodesk Infrastructure Map Server" src="{{ site.baseurl }}/files/images/2011/08/autodeskinfrastructuremapserver.png" alt="Autodesk Infrastructure Map Server logo" width="119" height="150" />
I encountered a problem today while working on a website that uses Autodesk Infrastructure Map Server 2012 (aka MapGuide) and its API. To programmatically create a new layer on a map it seems to be recommended to use the LayerDefinitionFactory that is provided with the installation of the server. Now the problem is that this factory is only provided in PHP and I am working in C#. I could install PHP on the server and try to get all freaky with .NET-PHP communication. But it seemed easier to just port the factory to C# (it's not that big anyway).

I wrote some basic functions and then only converted the stuff I need for this particular project, but it should be very easy to convert the other functions when you need them. I did not rewrite the `sprintf()` function that can be found in PHP, because it is a lot easier to use `String.Format()` if you adjust the template files. So, this is what one of the templates now look like after changing all the occurrences of `%s` to the C# version with `{0}`, `{1}`, etc.:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<LayerDefinition xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:noNamespaceSchemaLocation="LayerDefinition-2.3.0.xsd"
                 version="2.3.0">
  <VectorLayerDefinition>
    <ResourceId>{0}</ResourceId>
    <FeatureName>{1}</FeatureName>
    <FeatureNameType>FeatureClass</FeatureNameType>
    <Geometry>{2}</Geometry>
    {3}
  </VectorLayerDefinition>
</LayerDefinition>
```

And here is the code:

```cs
using System;
using System.Text;
using System.IO;

/// <summary>
/// Factory for MapGuide layer definitions.
/// </summary>
public class LayerDefinitionFactory
{
	string templatePath;

	public LayerDefinitionFactory(string path)
	{
		templatePath = String.Concat(path, "{0}.templ");
	}

	/// <summary>
	/// Read the template required for the layer definition.
	/// </summary>
	/// <returns>Returns (a part of) the layer definition in XML.</returns>
	private string ReadTemplate(string filename)
	{
		StreamReader reader = new StreamReader(String.Format(templatePath, filename));
		string templateDefinition = reader.ReadToEnd();
		reader.Close();
		return templateDefinition;
	}

	/// <summary>
	/// Create a new layerdefinition.
	/// </summary>
	public string CreateLayerDefinition(string resourceId, string featureClass, string geometry, string featureClassRange)
	{
		string[] values = new string[] { resourceId, featureClass, geometry, featureClassRange };
		return String.Format(ReadTemplate("layerdefinition"), values);
	}

	/// <summary>
	/// Create a new line rule for the layer definition.
	/// </summary>
	public string CreateLineRule(string lineStyle, string thickness, string color)
	{
		string[] values = new string[] { lineStyle, thickness, color };
		return String.Format(ReadTemplate("linerule"), values);
	}

	/// <summary>
	/// Create the line type style with line rules for the layer definition.
	/// </summary>
	public string CreateLineTypeStyle(string lineRules)
	{
		string[] values = new string[] { lineRules };
		return String.Format(ReadTemplate("linetypestyle"), values);
	}

	/// <summary>
	/// Create the scale range for the layer definition.
	/// </summary>
	public string CreateScaleRange(string minScale, string maxScale, string typeStyle)
	{
		string[] values = new string[] { minScale, maxScale, typeStyle };
		return String.Format(ReadTemplate("scalerange"), values);
	}
}
```
