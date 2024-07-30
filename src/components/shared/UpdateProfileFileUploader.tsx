import { useCallback, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";

type UpdateUserFileUploaderProps = {
  fieldChange: (FILES: File[]) => void;
  mediaUrl: string;
};

const UpdateProfileFileUploader = ({
  fieldChange,
  mediaUrl,
}: UpdateUserFileUploaderProps) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);
  const [file, setFile] = useState<File[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      setFile(acceptedFiles);
      fieldChange(acceptedFiles);
      setFileUrl(URL.createObjectURL(acceptedFiles[0]));
    },
    [file]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
  });

  return (
    <div className="w-fit">
      <input {...getInputProps()} className="cursor-pointer" />
      <div className="flex-center gap-3.5">
        <img
          src={fileUrl || "/assets/icons/profile-placeholder.svg"}
          alt="profile"
          className="object-cover rounded-full w-[100px] h-[100px]"
        />
        <p
          {...getRootProps()}
          className="base-semibold text-blue-500 cursor-pointer ring-0"
        >
          Change profile photo
        </p>
      </div>
    </div>
  );
};

export default UpdateProfileFileUploader;
