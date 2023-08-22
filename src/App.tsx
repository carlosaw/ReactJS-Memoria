import { useEffect, useState } from 'react';
import * as C from './App.styles';

import logoImage from './assets/devmemory_logo.png';
import RestartIcon from './svgs/restart.svg';

import { Button } from './components/Button';
import { InfoItem } from './components/InfoItem';
import { GridItem } from './components/GridItem';

import { GridItemType } from './types/GridItemType';
import { items } from './data/items';


const App = () => {
  const [playing, setPlaying] = useState<boolean>(false);// Se tá rolando o jogo
  const [timeElapsed, setTimeElapsed] = useState<number>(0);// Tempo passado
  const [moveCount, setMoveCount] = useState<number>(0);// Movimentos
  const [shownCount, setShownCount] = useState<number>(0);// Qtos foram mostrados
  const [gridItems, setGridItems] = useState<GridItemType[]>([]);

  useEffect(() => resetAndCreateGrid(), []);

  const resetAndCreateGrid = () => {
    // passo 1 - resetar o jogo
    setTimeElapsed(0);
    setMoveCount(0);
    setShownCount(0);

    // passo 2 - Criar o grid
    // 2.1 - criar um grid vazio
    let tmpGrid: GridItemType[] = [];
    for(let i = 0; i < (items.length * 2); i++) tmpGrid.push({
      item: null, shown: true, permanentShown: false
    });
    
    // 2.2 - preencher o grid
    for(let w = 0; w < 2; w++) {
      for(let i = 0; i < items.length; i++) {
        let pos = -1;
        while(pos < 0 || tmpGrid[pos].item !== null) {
          pos = Math.floor(Math.random() * (items.length) * 2);
        } 
        tmpGrid[pos].item = i;
      }
    }
    // 2.3 - jogar na state
    setGridItems(tmpGrid);

    // passo 3 - começar o jogo
    setPlaying(true);
  }

  const handleItemClick = (index: number) => {
    
  }

  return (
    <div>
      <C.Container>
        <C.Info>
          <C.LogoLink href="">
            <img src={logoImage} width={200} alt='' />
          </C.LogoLink>

          <C.InfoArea>
            <InfoItem label='Tempo' value='00:00' />
            <InfoItem label='Movimentos' value='0' />
          </C.InfoArea>

          <Button label='Reiniciar' icon={RestartIcon} onClick={resetAndCreateGrid} />

        </C.Info>
        <C.GridArea>
          <C.Grid>
            {gridItems.map((item, index)=>(
              <GridItem
                key={index}
                item={item}
                onClick={() => handleItemClick(index)}
              />
            ))}
          </C.Grid>
        </C.GridArea>
      </C.Container>
    </div>  
  );
}

export default App;