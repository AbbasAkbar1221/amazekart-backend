const express = require('express');
const router = express.Router();

const cartMap = new Map();

router.get('/', (req, res) => {
    const { username } = req.user;
    const cart = cartMap[username] || [];
    return res.json({ cart });
});

router.put('/', (req, res) => {
    const { username } = req.user;
    const { cart } = req.body;
    cartMap[username] = cart;
    return res.json({ message: "Updated cart" });
});

router.post('/', (req, res) => {
    const { username } = req.user;
    if (!cartMap[username]) {
        cartMap[username] = [];
    }
    const { item } = req.body;
    const itemInCart = cartMap[username].find(ele => ele.product_id === item.product_id);
    if (!itemInCart) {
        cartMap[username].push({
            ...item,
            quantity: 1,
            selected: true,
        });
    }
    return res.json({ cart: cartMap[username] });
});

router.patch('/toggle', (req, res) => {
    const { username } = req.user;
    if (!cartMap[username]) {
        cartMap[username] = [];
    }
    const { product_id } = req.body;
    const item = cartMap[username].find(item => item.product_id === product_id);
    if (item) {
        item.selected = !item.selected;
    }
    return res.json({ cart: cartMap[username] });
});

router.patch('/quantity', (req, res) => {
    const { username } = req.user;
    if (!cartMap[username]) {
        cartMap[username] = [];
    }
    const { product_id, increament } = req.body;
    const item = cartMap[username].find(item => item.product_id === product_id);
    if (item) {
        item.quantity += increament;
        if (item.quantity <= 0) {
            cartMap[username] = cartMap[username].filter(item => item.product_id !== product_id)
        }
    }
    return res.json({ cart: cartMap[username] });
});

module.exports = router;