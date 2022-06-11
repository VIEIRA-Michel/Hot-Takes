module.exports = (req, res, next) => {
    
    function checkAllInputs(sauce) {
        let formRegexp = /^[^@&"()!_$*€£`+=\/;?#]+$/;
        let { name, manufacturer, description, mainPepper } = sauce;
        if (formRegexp.test(name) && formRegexp.test(manufacturer) && formRegexp.test(description) && formRegexp.test(mainPepper)) {
            next();
        } else {
            res.status(400).json({ message: "Les caractères spéciaux sont interdits" })
        }
    }
    if (req.body.sauce === undefined) {
        checkAllInputs(req.body);
    } else if (req.body.sauce !== undefined) {
        checkAllInputs(JSON.parse(req.body.sauce));
    }
}
