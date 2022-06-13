const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })




exports.afficheHtml = (req, res, next) => {
    res.sendFile(process.cwd() + '/views/index.html');
};

let zmanChol;
let zmanShbt;

exports.saveZmanChol = (req, res, next) => {
    zmanChol = req.body;
    exports.zmanChol = zmanChol;
    res.json({message: "Les changements ont bien été pris en compte", zmanChol})
};

exports.saveZmanShbt = (req, res, next) => {
    zmanShbt = req.body;
    exports.zmanShbt = zmanShbt;
    res.json({message: "Les changements ont bien été pris en compte", zmanShbt})
};

exports.savePdf = (req, res, next) => {
    console.log(req.file);
    if(req.file === undefined) {res.status(404).json({erreur: "Aucun document n'a été fourni. Veuillez réessayer."})}
    res.json({message: "Les changements ont bien été pris en compte", originalname: req.file.originalname, path: req.file.path});
}



