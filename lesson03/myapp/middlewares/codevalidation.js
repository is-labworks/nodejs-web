function codeValidation(req, res, next) {
    const codeInReq = req.params.code;
    const codeInBody = req.body;
    
    let code = null;
    if (codeInReq) {
        code = codeInReq;
    }else if (codeInBody){
        code = codeInBody.code;
    }else {
        return res.status(400).json({ error: 'Product code is required.' });
    }

    const pattern = /^P\d{3}$/; 

    if (!pattern.test(code)) {
        return res.status(400).json({
            error: 'Invalid code format. Must be in format PXXX(e.g., P001).'
        });
    }
    next();
}

module.exports = codeValidation;