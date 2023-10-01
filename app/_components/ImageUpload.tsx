import { Group, Text, Image, Center } from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { MdUpload, MdCancel } from "react-icons/md";
import { IoMdImages } from "react-icons/io";
import { useEffect, useRef, useState } from "react";

interface Accept {
  [key: string]: string[];
}

interface ImageUploadProps extends Partial<DropzoneProps> {
  src?: string;
  alt?: string;
  maxWidth?: string;
  height?: string;
  accept?: Accept | string[];
  onReadSuccess: (b64: string) => void;
  initialImage?: string;
  hideInnerText?: boolean;
  iconSize?: number;
}

const ImageUpload = ({
  src,
  alt = "Uploaded image",
  accept = IMAGE_MIME_TYPE,
  maxWidth = "400px",
  height = "400px",
  initialImage,
  hideInnerText = false,
  onReadSuccess,
  iconSize,
  ...props
}: ImageUploadProps) => {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const getBase64 = (
    img: File,
    callback: (b64: string | undefined) => void
  ) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result?.toString()));
    reader.readAsDataURL(img);
  };

  const openRef = useRef<() => void>(null);

  return (
    <div style={{ maxWidth }}>
      <Dropzone
        openRef={openRef}
        loading={loading}
        style={{
          height: `calc(min(min(${height}, ${maxWidth}),min(100%, 100vw - 136px)))`,
          width: `calc(min(min(${height}, ${maxWidth}),min(100%, 100vw - 136px)))`,
          aspectRatio: "1/1",
        }}
        onDrop={(files) => {
          setLoading(true);
          getBase64(files[0], (b64) => {
            if (b64) {
              setImgSrc(b64);
              onReadSuccess(b64);
            }
            setLoading(false);
          });
        }}
        onReject={(files) => {
          console.error("An error occured while reading the file");
        }}
        styles={{
          root: {
            border: "1px solid #ddd",
            ...(!imgSrc && {
              display: "flex",
              alignItems: "center",
              justifyContent: hideInnerText ? "end" : "center",
            }),
          },
          inner: {
            pointerEvents: "none",
            height: imgSrc ? "100%" : "inherit",
          },
        }}
        maxSize={3 * 1024 ** 2}
        accept={accept}
        {...props}
      >
        {imgSrc ? (
          <Center>
            <Image
              styles={{
                root: {
                  maxHeight: `calc(min(min(${height}, ${maxWidth}),min(100%, 100vw - 136px)))`,
                  maxWidth: `calc(min(min(${height}, ${maxWidth}),min(100%, 100vw - 136px)))`,
                  objectFit: "cover",
                  aspectRatio: "1/1",
                },
              }}
              src={imgSrc}
              alt={alt}
            />
          </Center>
        ) : (
          <Group
            style={{
              minHeight: "calc(min(min(${height}, ${maxWidth}), 120px))",
              pointerEvents: "none",
            }}
          >
            <Dropzone.Accept>
              <MdUpload size={iconSize || 50} />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <MdCancel size={iconSize || 50} />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IoMdImages
                size={iconSize || 50}
                style={{
                  zoom: "calc(min(min(${height}, ${maxWidth}),min(100%, 100vw - 136px))/400px)",
                  paddingTop: 5,
                  width: "100%",
                }}
              />
            </Dropzone.Idle>

            <Group align="center" px={"xs"}>
              <Text size="sm">Drag image or click to select file</Text>
            </Group>
          </Group>
        )}
      </Dropzone>
    </div>
  );
};

export default ImageUpload;
