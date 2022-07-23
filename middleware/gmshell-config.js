const { exec } = require("child_process");
const fs = require("fs");

module.exports = (req, res, next) => {
  let nameOfFile = req.body.nameOfFile;
  let numberOfImage = req.body.numberOfImage;
  let oldPath = req.files[0].path;
  let newPath = `files\\${nameOfFile}`;

  exec(
    `gm.exe convert -density 150 ${oldPath}[0] -quality 100 "images/imageAffiche${numberOfImage}.jpg"`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        res.status(500).json({ error: error.message });
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
      fs.rename(oldPath, newPath, (err) => {
        if (err) throw err;
        console.log("fichier renommé dans './files'");
      });
      next();
    }
  );
};
