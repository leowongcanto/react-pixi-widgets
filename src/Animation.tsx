import * as PIXI from 'pixi.js'
import React, {
  PropsWithChildren,
  useLayoutEffect,
  MutableRefObject,
} from 'react'
import * as dragonBones from 'dragonbones.js'

interface Props {
  renderer?: PIXI.AbstractRenderer
  container?: MutableRefObject<PIXI.Container>
  loader?: PIXI.Loader
  factory?: dragonBones.PixiFactory
  x: number
  y: number
  playTime: number
  armatureName: string
  animationName: string
}

function Animation({
  renderer,
  container,
  loader,
  factory,
  x,
  y,
  playTime,
  armatureName,
  animationName,
}: PropsWithChildren<Props>) {
  useLayoutEffect(() => {
    if (renderer && container && loader && factory) {
      const anime = factory?.buildArmatureDisplay(armatureName)
      anime?.position?.set(x, y)
      anime?.animation.play(animationName, playTime)
      console.log('anime', anime)
      container?.current?.addChild(anime)
    }
    return () => {
      container?.current?.removeChildren()
    }
  }, [renderer, container, factory])
  return <></>
}

export default Animation
