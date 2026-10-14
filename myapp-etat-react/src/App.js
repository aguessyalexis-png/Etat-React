import React, { Component } from 'react'; 
import monImage from './image.jpg';

class App extends Component { 
  constructor(props) {
    super(props);
    this.state = {
      Personne: {
        fullName: 'Jean Jacques', 
        bio: 'Développeur passionné par React et les architectures web modernes.', 
        imgSrc: monImage, 
        profession: 'Ingénieur Logiciel'
      },
      montre: true,
      tempsEcoule: 0
    };
    this.intervalle = null;
  }

  // Démarrage du compteur après le montage
  componentDidMount() {
    this.demarrerCompteur();
  }

  // Démarrer le compteur
  demarrerCompteur = () => {
    this.intervalle = setInterval(() => {
      this.setState(prevState => ({ tempsEcoule: prevState.tempsEcoule + 1 }));
    }, 1000);
  };

  // Arrêter le compteur
  arreterCompteur = () => {
    clearInterval(this.intervalle);
    this.intervalle = null;
  };

  // Arrêter le compteur avant le démontage
  componentWillUnmount() {
    this.arreterCompteur();
  }

  basculerAffichage = () => {
    this.setState(
      prevState => ({ montre: !prevState.montre }),
      () => {
        // Une fois l'état mis à jour, on agit sur le compteur selon le statut
        if (this.state.montre) {
          this.demarrerCompteur();
        } else {
          this.arreterCompteur();
        }
      }
    );
  };

  render() {
    const { fullName, bio, imgSrc, profession } = this.state.Personne;

    return (
      <div className="container mt-5" style={{ textAlign: 'center', marginTop: '20px' }}> {/* Ajout des guillemets dans le style */}
        
        
        {this.state.montre && (
          <div style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px', display: 'inline-block' }}>
            <img src={imgSrc} alt={fullName} style={{ borderRadius: '50%', width: '150px' }} />
            <h2>{fullName}</h2>
            <h4>{profession}</h4>
            <p>{bio}</p>
          </div>
        )}

        <div style={{ marginTop: '20px' }}>
          <h3>Temps écoulé depuis le montage</h3>
          <p>{this.state.tempsEcoule} seconde(s)</p>
          <p>Statut du profil : {this.state.montre ? 'Visible' : 'Masqué'}</p>
        </div>

        <button className="btn btn-primary mb-4" onClick={this.basculerAffichage} style={{ marginBottom: '20px', padding: '10px' }}>
          {this.state.montre ? 'Masquer le profil' : 'Afficher le profil'}
        </button>


      </div>
    );
  }
}

export default App; 
