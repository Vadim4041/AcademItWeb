const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', {title: 'Express'});
});

let contacts = []; // { id, name, phone }
let currentContactId = 1;

router.get("/api/contacts", function (req, res) {
    const term = (req.query.term || "").toUpperCase();

    const result = term.length === 0
        ? contacts
        : contacts.filter(c => c.name.toUpperCase().includes(term) || c.phone.toUpperCase().includes(term));

    res.send(result);
});

router.delete("/api/contacts/:id", function (req, res) {
    const id = Number(req.params.id);

    contacts = contacts.filter(c => c.id !== id);

    res.send({
        success: true,
        message: null
    });
});

// { name, phone } add contact
router.post("/api/contacts/", function (req, res) {
    const contact = {
        name: req.body.name,
        phone: req.body.phone
    };

    if (!contact.name) {
        res.send({
            success: false,
            message: "Field 'name' is required"
        });

        return;
    }

    if (!contact.phone) {
        res.send({
            success: false,
            message: "Field 'phone' is required"
        });

        return;
    }

    const upperCasePhone = contact.phone.toUpperCase();

    if (contacts.some(c => c.phone.toUpperCase() === upperCasePhone)) {
        res.send({
            success: false,
            message: "Phone must be unique"
        });

        return;
    }

    if (isNaN(Number(upperCasePhone))) {
        res.send({
            success: false,
            message: "Phone must only contain digits"
        });

        return;
    }

    contact.id = currentContactId;
    currentContactId++;

    contacts.push(contact);

    res.send({
        success: true,
        message: null
    });
})

// { name, phone } edit contact
router.post("/api/contacts/:id", function (req, res) {
    const id = Number(req.params.id);
    const contactToEdit = contacts.find(c => c.id === id);
    const newName = req.body.newName;
    const newPhone = req.body.newPhone;

    if (!newName) {
        res.send({
            success: false,
            message: "Field 'name' is required"
        });

        return;
    }

    if (!newPhone) {
        res.send({
            success: false,
            message: "Field 'phone' is required"
        });

        return;
    }

    if (contacts.filter(c => c.id !== contactToEdit.id).some(c => c.phone.toUpperCase() === newPhone.toUpperCase())) {
        res.send({
            success: false,
            message: "Phone must be unique"
        });

        return;
    }

    if (isNaN(Number(newPhone))) {
        res.send({
            success: false,
            message: "Phone must only contain digits"
        });

        return;
    }

    contactToEdit.name = newName;
    contactToEdit.phone = newPhone;

    res.send({
        success: true,
        message: null
    });
})

module.exports = router;
