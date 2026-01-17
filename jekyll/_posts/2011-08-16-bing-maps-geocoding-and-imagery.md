---
layout: post
title: "Bing Maps - Geocoding and Imagery"
date: 2011-08-17 05:06:00
tags: ["gis"]
---
Since I did a lot of GIS related stuff recently for work, I decided I'd have some fun with the Bing Maps API. I've been using Bing to display maps as a base for multiple layers of data in combination with MapGuide OS and needed to convert addresses to coordinates. Afterwards I decided to play with it some more and I created a little app in C# that makes more use of Bing Maps.

If you want to **get started with the Bing API**, you'll first need to **get a key**. More info on that can be found [on MSDN](http://msdn.microsoft.com/en-us/library/ff428642.aspx).

Alright, now you got your key, let's get started!

## Setting up

First thing you need to do to use the Bing Maps service, is **adding a service reference**. We'll start out with some geocoding, so we need the geocode service. The addresses of the available services can be found [here](http://msdn.microsoft.com/en-us/library/cc966738.aspx "Bing Maps Services").

{% include
    figure.html url="/files/images/2011/08/bingapi_servicereference.png"
    description="Click 'Add Service Reference...' to open the service reference dialog"
    width="510"
%}

# Geocoding

We can use the following code to "geocode" an address (get the coordinates):

```cs
private String Geocode(string address)
{
    GeocodeRequest geocodeRequest = new GeocodeRequest();

    // Set credentials using a Bing Maps key
    geocodeRequest.Credentials = new GeocodeService.Credentials();
    geocodeRequest.Credentials.ApplicationId = key;

    // Set the address
    geocodeRequest.Query = address;

    // Make the geocode request
    GeocodeServiceClient geocodeService = new GeocodeServiceClient("BasicHttpBinding_IGeocodeService");
    GeocodeResponse geocodeResponse = geocodeService.Geocode(geocodeRequest);

    return GetGeocodeResults(geocodeResponse);
}
```

GetGeocodeResults is just a function that I made to print out the response on the screen. As seen here:

{% include
    figure.html url="/files/images/2011/08/bingapi_geocode.png"
    description="Get the coordinates for an address"
    width="510"
%}

(There are some extra options available. You could, for example, tell the service to only return "high confidence" results. But I'm not going to talk about that here.)

## Reverse geocoding

Because getting the coordinates was so easy, I decided to also implement reverse geocoding. Which is (as you would expect) converting coordinates to an address.

```cs
private String ReverseGeocode(double latitude, double longitude)
{
    ReverseGeocodeRequest reverseGeocodeRequest = new ReverseGeocodeRequest();

    // Set credentials using a Bing Maps key
    reverseGeocodeRequest.Credentials = new GeocodeService.Credentials();
    reverseGeocodeRequest.Credentials.ApplicationId = key;

    // Set the coordinates
    reverseGeocodeRequest.Location = new BingMapsSoap.GeocodeService.GeocodeLocation() { Latitude = latitude, Longitude = longitude };

    // Make the reverse geocode request
    GeocodeServiceClient geocodeService = new GeocodeServiceClient("BasicHttpBinding_IGeocodeService");
    GeocodeResponse geocodeResponse = geocodeService.ReverseGeocode(reverseGeocodeRequest);

    return GetGeocodeResults(geocodeResponse);
}
```

{% include
    figure.html url="/files/images/2011/08/bingapi_reversegeocode.png"
    description="Converting coordinates to addresses is easy!"
    width="510"
%}

## Imagery

After getting this far in about 15 minutes of figuring it out and coding, I couldn't stop there! I decided to add some basic imagery for the address/coordinates that are converted. For imagery you need to add a reference to the imagery service first. Writing code for this is also pretty easy, as there are plenty of examples on MSDN that can be useful. It seems Microsoft really put some effort into  documenting this right :-)

```cs
private void GetImagery(double latitude, double longitude)
{
    MapUriRequest mapUriRequest = new MapUriRequest();

    // Set credentials using Bing Maps key
    mapUriRequest.Credentials = new ImageryService.Credentials();
    mapUriRequest.Credentials.ApplicationId = key;

    // Set the location of the image
    mapUriRequest.Center = new ImageryService.Location();
    mapUriRequest.Center.Latitude = latitude;
    mapUriRequest.Center.Longitude = longitude;

    // Set map style and zoom level
    MapUriOptions mapUriOptions = new MapUriOptions();
    mapUriOptions.Style = MapStyle.AerialWithLabels;
    mapUriOptions.ZoomLevel = 17;

    // Set size of the image to match the size of the image control
    mapUriOptions.ImageSize = new ImageryService.SizeOfint();
    mapUriOptions.ImageSize.Height = 160;
    mapUriOptions.ImageSize.Width = 160;

    mapUriRequest.Options = mapUriOptions;

    ImageryServiceClient imageryService = new ImageryServiceClient("BasicHttpBinding_IImageryService");
    MapUriResponse mapUriResponse = imageryService.GetMapUri(mapUriRequest);
    BitmapImage bmpImg = new BitmapImage(new Uri(mapUriResponse.Uri));
    bingImage.Source = bmpImg;
}
```

That code gives us this result:

{% include
    figure.html url="/files/images/2011/08/bingapi_imagery.png"
    description="Bing Maps Imagery"
    width="510"
%}

Looks pretty good for a small app that took almost no time to make. The Bing Maps API is pretty straight-forward to work with and MSDN has some good samples to get started. So if you're interested in working with Bing Maps, be sure to check out [the documentation](http://msdn.microsoft.com/en-us/library/dd877180.aspx "Bing Maps on MSDN").

Now go and have fun with this!
