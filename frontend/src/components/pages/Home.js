import api from "../../utils/api";

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import styles from "./Home.module.css";

function Home() {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    api.get("/pets").then((response) => {
      setPets(response.data.pets);
    });
  }, []);

  return (
    <section>
      <div className={styles.pet_home_header}>
        <h1>ADOTE UM PET</h1>
        <p>
          Nossos pets estão esperando por você!
        </p>
      </div>
      <div className={styles.pet_container}>
        {pets.length > 0 &&
          pets.map((pet) => (
            <div className={styles.pet_card} key={pet._id}>
              {pet.available ? (
                <Link to={`/pet/${pet._id}`}>
                  <div
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                    }}
                    className={styles.pet_card_image}
                  ></div>
                  <h3>{pet.name}</h3>
                  <p>
                    <span>Peso:</span> {pet.weight}kg
                  </p>
                </Link>
              ) : (
                <div className={styles.pet_adopted}>
                  <div
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_API}/images/pets/${pet.images[0]})`,
                    }}
                    className={styles.pet_card_image}
                  ></div>
                  <h3>{pet.name}</h3>
                  <p>
                    <span className={styles.adopted_text}>Adotado!</span>
                  </p>
                </div>
              )}
            </div>
          ))}
        {pets.length === 0 && (
          <p>Não há pets cadastrados ou disponíveis para adoção no momento!</p>
        )}
      </div>
    </section>
  );
}

export default Home;
