export default function FileUploadField() {
	return (
		<label className="dropdown-item" id="fileHover">
      File upload <input type="file" hidden name="sampleFile" id="upload-input" accept="video/*" />
		</label>
	);
}