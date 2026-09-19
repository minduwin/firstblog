async function indexPage(req, res) {
    res.json({
        message: 'Welcome to the page'
    });
}

export default {
    indexPage,
}