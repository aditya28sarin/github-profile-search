function RepoFolders({details,loading}){
    if(loading){
        return (
            <h1 className="loader">loading..</h1>
        )
    }

    return(
        <div className="repo-details-container">
            <div className="details-row">
                <label className="label">Name:</label>
                <span className="value">{details.name}</span>
            </div>
        </div>
    )
}


export default RepoFolders;