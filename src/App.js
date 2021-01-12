import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import RepoDetails from './RepoDetails';

function App() {

  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  //Initialize a setRepose state with all off users repositories, initially empty
  const [repos, setRepos] = useState([]);
  const [details, setDetails] = useState({});
  const [detailsLoading, setDetailsLoading] = useState(false); 

  // To get repo folders 
   const [repoFolders, setRepoFolders]=useState([]);

  //clear screen when we start typing for new user
  useEffect(()=>{
    setRepos([]);
    setDetails({});
  },[username]);

  // It handles the submission request sent after pressing the button
  function handleSubmit(e){
    e.preventDefault();
    searchRepos();
  }

  function searchRepos(){
    setLoading(true);
     axios({
       method:"get",
       url:`https://api.github.com/users/${username}/repos`
     }).then(res=>{
       setLoading(false);
       setRepos(res.data);
     });
  }

  //it is called for each and every repo of the user
  function renderRepo(repo){
    return(
    <div className="row" onClick={()=> someFunction(repo.name)} key={repo.id}>
      <h2 className="repo-name">{repo.name}</h2>
    </div>
    
    )
  }

//to perfom both the functions
function someFunction(repoName){
  getDetails(repoName);
  searchFolders(repoName);
}

  function getDetails(repoName){
    setDetailsLoading(true);
    axios({
      method:"get",
      url: `https://api.github.com/repos/${username}/${repoName}`
    }).then(res=>{
      setDetailsLoading(false);
      setDetails(res.data);
    });
  }



// //code to get repo folders and its info 

function searchFolders(repoName){
  setDetailsLoading(true);
  axios({
    method:"get",
    url:`https://api.github.com/repos/${username}/${repoName}/contents/`
  }).then(res=>{
    setDetailsLoading(false);
    setRepoFolders(res.data);
  });
}

function renderFolders(repoFolder){
  return(
    <div className="repo-content">
      <h2 className="repo-name">{repoFolder.name}</h2>
    </div>
  )
}

  return (
    <div className="page">
      <div className="landing-page-container">
        <div className="left-side">
          <form className="form">
            <input 
            className="input"
            value={username}
            placeholder="GitHub Username"
            onChange={e=> setUsername(e.target.value)}
            />
            <button className="button" onClick={handleSubmit}>{loading?"Searching.." : "Search"}</button>
          </form>
          <div className="results-container">
              {repos.map(renderRepo)}
          </div>
          <div className="results-container">
             {repoFolders.map(renderFolders)}
          </div>
        </div>
        <RepoDetails details={details} loading={detailsLoading}/>
        {/* <RepoFolders details={repoFolders} loading={repoLoading}/> */}
      </div>
    </div>
  );
}

export default App;
