---
layout: post
title: "Parallel programming in .NET - Task Parallel Library"
date: 2011-12-17 06:04:00
tags: ["parallel", ".net"]
comments: true
---
I have talked about parallel programming in .NET before, very briefly: [Parallel programming in .NET - Introduction]({% post_url 2010-08-30-parallel-programming-in-net-introduction %}). This follow-up post is long overdue :)

## What is the TPL?

The Task Parallel Library is a set of APIs present in the `System.Threading` and `System.Threading.Tasks` namespaces. The point of these APIs is to make parallel programming easier to read and code. The library exposes the `Parallel.For` and `Parallel.ForEach` methods to enable parallel execution of loops and takes care of spawning and terminating threads, as well as scaling to multiple processors.

## How do we use the TPL?

Following code uses the sequential and the parallel approach to go over a for-loop with some heavy calculations. I use the `StopWatch` class to compare the results in a command window.

```cs
//Sequential
watch = new Stopwatch();
watch.Start();
for (int i = 0; i < 20000; i++)
{
    SomeHeavyCalculations(i);
}
watch.Stop();
Console.WriteLine("Sequential Time: " + watch.Elapsed.Seconds.ToString());

//Parallel
watch = new Stopwatch();
watch.Start();
System.Threading.Tasks.Parallel.For(0, 20000, i =>
{
    SomeHeavyCalculations(i);
}
);
watch.Stop();
Console.WriteLine("Parallel Time: " + watch.Elapsed.Seconds.ToString());
```

The result of running this on my laptop (with multiple cores) looks like this:

{% include
    figure.html url="/files/images/2011/12/parallel_net_comparison.png"
    description="Result of comparison sequential - parallel"
    width="300"
%}

As you can see, the parallel for-loop runs A LOT faster than the sequential version. By using all the available processing power, we can speed up loops significantly!

Below is a screenshot of the task manager keeping track of what's happening  while executing the sequential and the parallel. What we can see here is that at first (where the red arrow is pointing at) we only use 1 core heavily. When the parallel code kicks in, all cores peak.

{% include
    figure.html url="/files/images/2011/12/parallel_net_taskman.png"
    description="Task manager during comparison sequential - parallel"
    width="510"
%}

So, looking at the above code, implementing all this parallelism doesn’t seem to be that hard. The TPL makes it pretty easy to make use of all the processors in a machine.

## Creating and running tasks

It’s possible to run a task implicitly by using the `Parallel.Invoke` method.

```cs
Parallel.Invoke(() => DoSomething())
Parallel.Invoke(() => DoSomething(), () => DoSomethingElse())
```

All you need to do is pass in a delegate, using lambda expressions makes this easy. You can call a named method or have some inline code. If you want to start more tasks concurrently, you can just insert more delegates to the same `Parallel.Invoke` method.

If you want more control over what’s happening, you’ll need to use a Task object, though. The task object has some interesting methods and properties that we can use to control the flow of our parallel code.

It is possible to use `new Task()` to create a new task object, but it’s a best practice to use the task factory. (Note that you can’t use the task factory if you want to separate the creation and the scheduling of the task.)

```cs
// Create a task and start it
var task1 = new Task(() => Console.WriteLine("Task1 says hi!"));
task1.Start();

// Create a task using the task factory
var task1 = Task.Factory.StartNew(() => Console.WriteLine("Task1 says hi!"));
```

You can also get results from a task, by accessing the `Result` property. If you access it before the task is completed, the thread will be blocked until the result is available.

```cs\
taskreturn = Task.Factory.StartNew(() =>
  {
    int calc = 3 + 3;
    return calc;
  });
int result = taskreturn.Result;
```

## To be continued..

You can chain tasks by using the `Task.ContinueWith` method. It’s also possible to access the result of the preceding task in the next one, using the `Result` property.

```cs
// Regular continuation
Task<int> task1 = Task.Factory.StartNew(() => 5);
Task<string> task2 = task1.ContinueWith(x => PrintInt(x.Result));

// Chained continuation
Task<string> task1 = Task.Factory.StartNew(() => 5)
                     .ContinueWith(x => PrintInt(x.Result));
```

The methods `ContinueWhenAll()` and `ContinueWhenAny()` make it possible to continue from multiple tasks by taking in an array of tasks to wait on and the action to be undertaken when those have finished. More about those functions can be found [on MSDN](http://msdn.microsoft.com/en-us/library/dd321479.aspx).

## The force is strong with this one

We only looked at a few functions of the TPL and I think it’s clear this is a very powerful library. When working on applications that need a lot of processing power, parallel programming in .NET can make it easier to improve performance, a lot.

## Resources

Of course there is a lot more to TPL than covered in this small introduction, so go ahead and explore!

*   [MSDN chapter on Task Parallel Library](http://msdn.microsoft.com/en-us/library/dd460717.aspx)
*   [Blog of the Parallel Extensions team](http://blogs.msdn.com/b/pfxteam/)
