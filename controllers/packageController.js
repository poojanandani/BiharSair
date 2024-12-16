import Package from '../models/Package.js';

//create new tour 
export const createPackage = async(req,res)=>{
    const newPackage = new Package(req.body);

    try {
        const savedPackage = await newPackage.save();
        res
            .status(200)
            .json({
                success:true, 
                message:"Successfully created",
                data:savedPackage
            });

    } catch (err) {
        res
            .status(500)
            .json({
                success:false, 
                message:"Failed to create. Try again"
            });
    }

};

//delete tour
export const deletePackage = async(req,res)=>{
    const id=req.params.id;

    try {

        await Package.findByIdAndDelete(id);

        res
            .status(200)
            .json({
                success:true, 
                message:"Successfully deleted"
            });

    } catch (err) {
        res
            .status(500)
            .json({
                success:false, 
                message:"failed to delete",
            });
    }
}

//getAll tour
export const getAllPackage = async(req,res)=>{

    //for pagination
    const page = parseInt(req.query.page);

    try {
        const tours = await Package.find({}).populate("reviews")
        .skip(page * 12).limit(12);

        res
            .status(200)
            .json({
            success: true,
            count: tours.length,
            message: "Successful",
            data:tours,})
    } catch (err) {
        res
        .status(404)
        .json({
            success:false, 
            message:"not found",
        });
    }
}
