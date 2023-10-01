import React, { useCallback, useMemo, useState } from 'react'
import { useDropzone } from 'React-dropzone'

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined'

import './dropzone.scss'

type ModalProps = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const baseStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer'
}

const focusedStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

const img = {
  display: 'block',
  width: '100px',
  height: '100px'
}

const Dropzone = (props: ModalProps): React.JSX.Element => {
  const [files, setFiles] = useState<(File & { preview: string })[]>([])
  const [rejected, setRejected] = useState([])
  const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
    if (acceptedFiles?.length) {
      setFiles((previousFiles) => [
        ...previousFiles,
        ...acceptedFiles.map((file) => Object.assign(file, { preview: URL.createObjectURL(file) }))
      ])
    }

    if (rejectedFiles?.length) {
      setRejected((previousFiles) => [...previousFiles, ...rejectedFiles])
    }
  }, [])
  const { getRootProps, getInputProps, isDragActive, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        'image/*': []
      },
      maxFiles: 2,
      maxSize: 1024 * 1000,
      onDrop
    })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault()

    if (!files?.length) return

    const formData = new FormData()
    files.forEach((file) => formData.append('file', file))
    formData.append('upload_preset', 'friendsbook')

    console.log(formData)
  }

  const removeAll = (): void => {
    setFiles([])
    setRejected([])
  }

  const removeFile = (name): void => {
    setFiles((files) => files.filter((file) => file.name !== name))
  }

  const removeRejected = (name): void => {
    setRejected((files) => files.filter(({ file }) => file.name !== name))
  }

  return (
    <div className="modalImage">
      <div className="modal">
        <span className="close" onClick={(): void => props.setOpen(false)}>
          X
        </span>
        <h1>Agregar Imagenes</h1>
        <form onSubmit={handleSubmit}>
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-4">
              <FileUploadOutlinedIcon className="w-5 h-5 fill-current" />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <p>Drag & drop files here, or click to select files</p>
              )}
            </div>
          </div>
          {/* Preview */}
          <section className="mt-10">
            <div className="flex gap-4">
              <h2 className="title text-3xl font-semibold">Preview</h2>
              <button
                type="button"
                onClick={removeAll}
                className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
              >
                Remove all files
              </button>
              <button
                type="submit"
                className="ml-auto mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-purple-400 rounded-md px-3 hover:bg-purple-400 hover:text-white transition-colors"
              >
                Upload to Cloudinary
              </button>
            </div>

            {/* Accepted files */}
            <h3 className="title text-lg font-semibold mt-10 border-b pb-3">Accepted Files</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
              {files.map((file) => (
                <li key={file.name} className="relative h-32 rounded-md shadow-lg">
                  <img
                    src={file.preview}
                    style={img}
                    // Revoke data uri after image is loaded
                    onLoad={(): void => {
                      URL.revokeObjectURL(file.preview)
                    }}
                  />
                  <button
                    type="button"
                    className="w-7 h-7 border border-secondary-400 bg-secondary-400 rounded-full flex justify-center items-center absolute -top-3 -right-3 hover:bg-white transition-colors"
                    onClick={(): void => removeFile(file.name)}
                  >
                    <DeleteForeverOutlinedIcon className="w-5 h-5 fill-white hover:fill-secondary-400 transition-colors" />
                  </button>
                  <p className="mt-2 text-neutral-500 text-[12px] font-medium">{file.name}</p>
                </li>
              ))}
            </ul>

            {/* Rejected Files */}
            <h3 className="title text-lg font-semibold mt-10 border-b">Rejected Files</h3>
            <ul className="flex flex-col">
              {rejected.map(({ file, errors }) => (
                <li key={file.name} className="flex items-start justify-between">
                  <div>
                    <p className="mt-2 text-neutral-500 text-sm font-medium">{file.name}</p>
                    <ul className="text-[12px] text-red-400">
                      {errors.map((error) => (
                        <li key={error.code}>{error.message}</li>
                      ))}
                    </ul>
                  </div>
                  <button
                    type="button"
                    className="mt-1 py-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
                    onClick={(): void => removeRejected(file.name)}
                  >
                    remove
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </form>
      </div>
    </div>
  )
}

export default Dropzone
