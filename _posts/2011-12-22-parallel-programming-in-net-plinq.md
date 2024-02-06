---
layout: post
title: "Parallel programming in .NET - PLINQ"
date: 2011-12-23 06:02:00
tags: parallel .net
comments: true
---
Now that we've covered the [Task Parallel Library]({% post_url 2011-12-16-parallel-programming-in-net-task-parallel-library %}), it's time to move on.

## What is PLINQ?

PLINQ stands for Parallel LINQ and is simply the parallel version of LINQ to Objects. Just like LINQ you can use it on any IEnumerable and there’s also deferred execution. Using PLINQ is even easier than using the Task Parallel Library!

{% include
    figure.html url="/files/images/2011/12/parallel_net_plinq.png"
    description="Regular for loop and LINQ compared to PLINQ (with time in seconds)"
    width="300"
%}

## How do we use PLINQ?

You can even make existing LINQ queries parallel simply by adding the `AsParallel()` method. That’s how easy it is! This makes it easy to use the power of parallelization, while enjoying the readability of LINQ. Isn’t that great?

```cs
var employees = GetEmployees();

// Regular LINQ
var query = employees.Select(e => e.Skills.Contains("C#"));

// Extension method style PLINQ
var queryParallel1 = employees.AsParallel()
                              .Select(e => e.Skills.Contains("C#"));

// Query expression style PLINQ
var queryParallel2 = from e in employees.AsParallel()
                     where e.Skills.Contains("C#")
                     select e;
```

Important fact: PLINQ uses all the processors of your system by default, with a maximum of 64. In some cases you might want to limit this, to give a machine some more power to take care of other tasks. Everybody deserves some CPU time! So don’t be greedy and use `WithDegreeOfParallelism()` on heavy queries. Following example uses a maximum of 3 processors, even if there are 16 available.

```cs
var queryDegree = employees.AsParallel()
                           .WithDegreeOfParallelism(3)
                           .Select(e => e.Skills.Contains("C#"));
```

By default PLINQ doesn’t care about the order of your output, compared to the input. This is because order preservation costs more time. You can enable order preservation though, again in a very simple way, by using the `AsOrdered()` method. It’s good to know that `OrderBy()` will also take care of order preservation.

```cs
var employees = GetEmployeesOrderedByName();

var queryOrdered = employees.AsParallel()
                            .Select(e => e.Skills.Contains("C#"))
                            .AsOrdered();
```

## We want more!

PLINQ has a lot more to offer than what we talked about here, so be sure to use Google and MSDN if you want to know more. Check out this "old" (2007) yet interesting [article on PLINQ](http://msdn.microsoft.com/en-us/magazine/cc163329.aspx) from MSDN magazine. An important read is [Understanding Speedup in PLINQ on MSDN](http://msdn.microsoft.com/en-us/library/dd997399.aspx), which explains a bit more of how PLINQ works and why it sometimes defaults to sequential mode anyway.
