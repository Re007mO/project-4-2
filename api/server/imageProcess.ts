import sharp from "sharp"

export const resizeImage = async (inputPath: string, outputPath: string, width: number, height: number) => {
    try{
        await sharp(inputPath)
        .resize(width,height)
        .toFile(outputPath)
        return outputPath; // Return the path of the resized image

    }catch(error){
        console.log(error)
    }
}
