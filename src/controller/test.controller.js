
const testing1=async (req,res) => {
    console.log("in testing")

    res.status(200).clearCookie('refreshToken').clearCookie('accessToken').json({message:"user logout successfully"})
}
export { testing1 };    