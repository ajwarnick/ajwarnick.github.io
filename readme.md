### Install steps

1. Download and Install [Node.js](https://nodejs.org/en/)

2. Open your project in Github Desktop

3. Click on the current branch tab

4. Click on 'New Branch'
   ![Image of new branch action](https://github.com/ajwarnick/ajwarnick.github.io/raw/templet/.instructions/new-branch-button-mac.png)

5. Name the new branch 'Templet' 

6. Download my [templet](https://github.com/ajwarnick/ajwarnick.github.io/) to your Downloads folder

7. Unzip the downloaded templet .zip

8. Copy the content into your project folder

9. Open Terminal within Visual Studio Code
   ![terminal activation in Visual Studio Code](https://github.com/ajwarnick/ajwarnick.github.io/raw/templet/.instructions/terminal.png)

10. Run command 

   ```bash
   npm install
   ```

11. **[ MAC ONLY ]**  Install Xcode command line tools  
    ![Image of Xcode prompt](https://github.com/ajwarnick/ajwarnick.github.io/raw/templet/.instructions/xcode.png)

12. **[ MAC ONLY ]** Click Install and wait for the installation to complete

13. **[ MAC ONLY ]** Agree to the Xcode terms of service

14. **[ MAC ONLY ]** Click done

### Process

Your CSS should move inside the 'css' folder, and your images should move to the 'img' folder. These will be copied over to the static site. Your templets should live inside the '_includes' folder, and they should be .njk files instead of .html. The only difference between these two files is inside of our .njk files we can use our variables. Please look over my files to understand how I have broken the parts of the html into a few difference files. 

### Development

When we are working on our projects we will need to use the terminal to launch our projects instead of our live server. We do that by running the following command:

```bash
npm run watch
```

