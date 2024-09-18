const User = require('../Models/User'); // Adjust the path to your User model

const getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ userName: `${user.firstName} ${user.lastName}` });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getUserById };
