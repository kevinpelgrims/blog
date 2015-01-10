---
layout: post
title: "Setting up multiple GitHub accounts on Windows"
date: 2012-07-20 06:51:00
categories: version-control git
---
<img style="float: right;" alt="github windows" src="http://kevinpelgrims.com/blog/files/images/2012/07/github_windows.png" />

So you have Windows, you're using [msysgit](https://code.google.com/p/msysgit/) and you already have [GitHub](https://github.com/) [set up](https://help.github.com/articles/set-up-git). But now you have a second GitHub account and you need that to work on your current installation as well. It took me some time to get this right, so I want to share my experience here. This is a bit tricky, but I will try to explain in 3 short steps.

##Create a new SSH key
First you need to create a new SSH key. This is how you will identify yourself to GitHub.

    ssh-keygen -t rsa -C "your_email@youremail.com"
    # Creates a new ssh key using the provided email

    # Generating public/private rsa key pair.
    # Enter file in which to save the key (/c/Users/you/.ssh/id_rsa): 

You should be careful at that last step. You already have a key, so be sure to enter a new name for this file, to avoid overriding the old one. For example, at the prompt type `/c/Users/you/.ssh/id_rsa_two`.


##Configure the SSH key
To find the key you just created, go to the .ssh folder and open the new file `id_rsa_two.pub`. Copy the entire content of that file and paste it to GitHub in in [Account Settings > SSH Keys](https://github.com/settings/ssh).

You'll also need to add the key to your local ssh database. This part gets annoying on Windows, because the ssh-add command doesn't work out of the box in Git Bash. But there's a trick! In Git Bash first run `exec ssh-agent bash`, this will make sure your SSH agent is running (it will also change the prompt, but let's not care about that). Now you can go ahead and `ssh-add /c/Users/you/.ssh/id_rsa_two` without any problems.

##Create a config file
But the fun is not over yet! You need to set up the two profiles in a config file. Create `/c/Users/you/.ssh/config` and make it look like this:

    #Account one
    Host one.github.com
        HostName github.com
        PreferredAuthentications publickey
        IdentityFile /c/Projects/.ssh/id_rsa

    #Account two
    Host two.github.com
        HostName github.com
        PreferredAuthentications publickey
        IdentityFile /c/Projects/.ssh/id_rsa_two

This will make sure git knows about the two identities and can pick the right one when you talk to GitHub.

##Test it!
You can now make sure your setup works by running `ssh -T git@github.com` and `ssh -T git@github.com -i /c/Users/you/.ssh/id_rsa_two`. This will test both identities and should return something like `Hi kevinpelgrims! You've successfully authenticated, but GitHub does not provide shell access.`.

Now everything is set up and you're ready to go! Next time you clone a repository from second account, you should use `git@two.github.com` in the URL, instead of the default `git@github.com`. Otherwise it will default to the first account.
