import ReactToolTip from 'react-tooltip'
import styles from '../styles'


const healthPoints = 25;

const healthLevel = (points) => {
  if (points > 12) {
    return 'bg-green-500'
  }
  else if (points > 6) {
    return 'bg-orange-500'
  }
  else {
    return 'bg-red-500'
  }
}

const marginIndexing = (index) => {
  if (index !== healthPoints - 1) {
    return 'mr-1'
  }
  else {
    return 'mr-0'
  }
}


const PlayerInfo = ({ player, playerIcon, mt }) => {
  return (
    <div className={`${styles.flexCenter} ${mt ? "mt-4" : "mb-6"}`}>

      <img src={playerIcon} data-for={`Player-${mt ? '1' : '2'}`}  data-tip alt="playerIcon" className='w-14 h-14 object-contain rounded-full' />

      

      <div data-for={`Health-${mt ? '1' : '2'}`} data-tip={`Health : ${player?.health}`} className={styles.playerHealth}>

        {[...Array(player.health).keys()].map((item, index) => (
          <div key={index} className={`${styles.playerHealthBar} ${healthLevel(player.health)} ${marginIndexing(index)}`}>
          </div>
        ))}

      </div>

      <div className={`${styles.flexCenter} ${styles.glassEffect} ${styles.playerMana}`} data-for={`Mana-${mt ? "1" : "2"}`} data-tip="Mana">

        {player.mana || 0}

      </div>

      

      <ReactToolTip id={`Player-${mt ? "1" : "2"}`} effect='solid' backgroundColor='#7f46f0'>
        <p className={styles.playerInfo}>
          <span className={`${styles.playerInfoSpan} mr-2`}>Name:</span>
          {player.playerName}
        </p>

        <p className={styles.playerInfo}>
          <span className={`${styles.playerInfoSpan} mr-2`}>Address:</span>
          {player?.playerAddress?.slice(0, 10)}
        </p>
      </ReactToolTip>

      <ReactToolTip id={`Health-${mt ? "1" : "2"}`} effect='solid' backgroundColor='#7f46f0' />

      <ReactToolTip id={`Mana-${mt ? "1" : "2"}`} effect='solid' backgroundColor='#7f46f0' />


    </div>
  )
}

export default PlayerInfo
