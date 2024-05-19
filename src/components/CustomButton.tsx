import { setImage } from "../lib/firebase"

export default function CustomButton({onSuccess}: {onSuccess: () => void}){
  // this class should be a button that when clicked, opens up a file selection dialog (images only)
// then converts this image to base64
// and then calls setImage and passes base64 string to it

  async function handleFileUpload(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64 = reader.result;
      await setImage(base64);

      // sleep for 1 second then call onSuccess
      await new Promise(resolve => setTimeout(resolve, 1000));

      onSuccess();
    };
  }

  return (
    <div>
      <input className="max-w-[200px]" type="file" onChange={handleFileUpload} />
    </div>
  );
}
