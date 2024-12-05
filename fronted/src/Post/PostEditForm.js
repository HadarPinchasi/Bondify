
function PostEditForm({ editingData, setEditingData, onSaveEdit }) {

    const onContentChange = (newContent) => {
        setEditingData((prev) => ({ ...prev, content: newContent }))
    }

    const onPhotoChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = function () {
            setEditingData((prev) => ({ ...prev, photo: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    const onCancelEdit = () => { setEditingData(({ content: null, photo: null })) }


    return (
        <div className="card-text mt-2">
            <input type="text" className="form-control" style={{ width: '600px' }} value={editingData.content} onChange={(e) => onContentChange(e.target.value)} />
            {editingData.photo && (
                <div>
                    <img src={editingData.photo} alt="Edited" style={{ maxWidth: '606px', maxHeight: '500px' }} />
                </div>
            )}
            <div className="row">
                <label className="btn btn-light col-md-4" style={{ maxHeight: '37px' }}>
                    change photo <input type="file" accept="image/*" style={{ display: 'none' }} onChange={onPhotoChange} />
                </label>
                <button className="btn btn-light btn-primary col mb-4" onClick={onSaveEdit}>Save</button>
                <button className="btn btn-light btn-secondary col mb-4" onClick={onCancelEdit}>Cancel</button>
            </div>
        </div>
    );
}

export default PostEditForm;
