export default class Auth {
    static checkUserStatus(req, res) {
        res.status(200).json({ success: true });
    }
}
