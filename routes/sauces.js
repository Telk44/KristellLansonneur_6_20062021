const express = require('express');
const router = express.Router();//creation d'un router avec méthode de express
const auth = require('../middleware/auth');//importation du middleware auth pour appliquer sur routes qu'on veut protéger
const multer = require('../middleware/multer-config');//importation multer pour gérer les fichiers entrants
const saucesCtrl = require('../controllers/sauces');

router.post('/', auth, multer, saucesCtrl.createSauce);
    
router.get('/:id', auth, saucesCtrl.getOneSauce);

router.put('/:id',auth, multer, saucesCtrl.modifySauce);

router.delete('/:id',auth, saucesCtrl.deleteSauce);

router.get('/', auth, saucesCtrl.getAllSauce );

router.post('/:id/like', auth, saucesCtrl.tasteSauce);
    
module.exports = router;