

interface IUploaderProps{
    progress:number;
    isUploading:boolean;
    status:string;
}

function Uploader({progress,isUploading,status}:IUploaderProps) {
  return (
    <div>
        {
  isUploading && (
    <div className="fixed top-20 right-4 z-50">

      <div className="bg-white p-4 rounded-xl shadow-lg">

        <p>
          {
  status === "uploading" && "Uploading..."
}

{
  status === "success" && "Recipe uploaded!"
}

{
  status === "error" && "Upload failed"
}
        </p>

        <div className="w-64 h-2 bg-gray-200 rounded-full">

          <div
            className="h-2 bg-orange-500 rounded-full"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>

    </div>
  )
}

    </div>
  )
}

export default Uploader