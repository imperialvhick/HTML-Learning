#!/bin/bash

# 0. Teleport straight to your project repository
cd ~/Documents/HTML-Learning

# 1. Stage all changes
git add .

# 2. Ask for the commit message
echo "Enter your commit message:"
read message

# 3. Commit with that message
git commit -m "$message"

# 4. Push to the current branch
git push

echo "Successfully pushed!"