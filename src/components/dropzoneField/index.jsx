import { Controller, } from "react-hook-form";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export const DropzoneField = ({
    name,
    control,
    ...rest
}) => {
    return (
        <Controller
            render={({ field: { onChange }, fieldState: { error } }) => (
                <div>
                    <Dropzone
                        onChange={(e) => onChange(e.target.files[0])}
                        name={name}
                        {...rest}
                    />
                    <p>{error?.message}</p>
                </div>
            )}
            name={name}
            control={control}
            defaultValue=""
        />
    );
};

const Dropzone = ({ onChange, setValue, name, ...rest }) => {
    const onDrop = useCallback((acceptedFiles) => {
        setValue(name, acceptedFiles[acceptedFiles.length - 1]);
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
    return (
        <div {...getRootProps()}>
            <input {...getInputProps({ onChange })} />
            {isDragActive ? (
                <p>Drop in here..</p>
            ) : (
                <p>Seret ke sini atau klik untuk memilih file</p>
            )}
        </div>
    );
};