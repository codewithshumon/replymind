import User from "./../models/UserSchema.js";

export const updateUser = async (req, res) => {
  const id = req.params.id;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updateUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faild to update",
    });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "Successfully deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Faild to delete",
    });
  }
};

export const getUserProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId).select("-password");

    if (!user) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    //const { password, ...rest } = user._doc;

    res.status(200).json({
      success: true,
      message: "Users found",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
    });
  }
};
