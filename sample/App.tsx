import React, { useEffect, useState, useRef } from 'react'
import PixiCanvas from '../src/PixiCanvas'
import PixiContainer from '../src/PixiContainer'
import Dragonbone from '../src/Dragonbones'
import Animation from '../src/Animation'
import * as PIXI from 'pixi.js'
import './App.css'

const ANIMATION_PARAM = {
  SKE: 'mecha_1004d_ske.json',
  TEX: 'mecha_1004d_tex.json',
  IMAGE: 'mecha_1004d_tex.png',
  ARM: 'mecha_1004d',
  ANIM_ATTACK: 'attack_01',
}
function App() {
  const [loaded, setLoaded] = useState(false)
  const loader = useRef(new PIXI.Loader())
  useEffect(() => {
    loader.current
      .add(ANIMATION_PARAM.SKE, ANIMATION_PARAM.SKE)
      .add(ANIMATION_PARAM.TEX, ANIMATION_PARAM.TEX)
      .add(ANIMATION_PARAM.IMAGE, ANIMATION_PARAM.IMAGE)
      .load(() => {
        setLoaded(true)
      })
  }, [])
  return (
    <div className="hanger">
      {loaded ? (
        <div className="container">
          <PixiCanvas
            loader={loader.current}
            internalWidth={2600}
            internalHeight={1340}
          >
            <PixiContainer fps={30}>
              <Dragonbone
                skeName={ANIMATION_PARAM.SKE}
                texJson={ANIMATION_PARAM.TEX}
                texImage={ANIMATION_PARAM.IMAGE}
              >
                <Animation
                  x={300}
                  y={400}
                  playTime={0}
                  armatureName={ANIMATION_PARAM.ARM}
                  animationName={ANIMATION_PARAM.ANIM_ATTACK}
                />
              </Dragonbone>
            </PixiContainer>
          </PixiCanvas>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default App
