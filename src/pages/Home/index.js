import { Header } from '../../components/Header'
import { ItemList } from '../../components/ItemList'
import { useState } from 'react';
import './style.css'


function App() {
  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [respos, setRespos] = useState(null)

  async function handleGetData() {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    if (newUser.name) {
      const { avatar_url, name, bio, login } = newUser
      setCurrentUser({ avatar_url, name, bio, login })

      const userRepos = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await userRepos.json()

      if (newRepos.length) {
        setRespos(newRepos)
      }
    }

  }

  return (
    <div className="App">
      <Header />
      <div className='conteudo'>

        <div className='conteudo-info'>
          <div className='conteudo-search'>
            <input name='usuario'
              value={user}
              onChange={e => setUser(e.target.value)}
              placeholder="@username"
            />
            <button onClick={handleGetData}>Pesquisar</button>
          </div>

          {currentUser?.name ? (
            <>
              <div className='perfil'>
                <img src={currentUser.avatar_url}
                  className='profile'
                  alt='Imagem do Perfil'
                />
                <h3>{currentUser.name}</h3>
                <span>@{currentUser.login}</span>
                <p>{currentUser.bio}</p>
              </div>

              <hr />
            </>
          ) : null}

          {respos?.length ? (
            <div className='respos'>
              <h4>Repositórios</h4>
              {respos.map(repo => (
                <ItemList title={repo.name} description={repo.description} />
              ))}
            </div>
          ) : null}

        </div>
      </div>

    </div>
  );
}

export default App;
