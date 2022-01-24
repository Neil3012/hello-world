/*!
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import * as MRE from '@microsoft/mixed-reality-extension-sdk';
import { AnimationWrapMode, Quaternion } from '@microsoft/mixed-reality-extension-sdk';
import { privateDecrypt } from 'crypto';

/**
 * The main class of this app. All the logic goes here.
 */
export default class HelloWorld {
	private text: MRE.Actor = null;
	private Set_One: MRE.Actor = null;
	private Set_Two: MRE.Actor = null;
	private Set_Three: MRE.Actor = null;
	private ContainerActor: MRE.Actor = null;
	private _anim: MRE.Animation = null;
	private assets: MRE.AssetContainer;
	private light: MRE.Light;
	constructor(private context: MRE.Context) {

		this.context.onStarted(() => this.started());

	}

	/**
	 * Once the context is "started", initialize the app.
	 */
	private async started() {
		// set up somewhere to store loaded assets (meshes, textures, animations, gltfs, etc.)
		this.assets = new MRE.AssetContainer(this.context);

	
		// Create a new actor with no mesh, but some text.
		this.text = MRE.Actor.Create(this.context, {
			actor: {
				name: 'Text',
				transform: {
					app: {
						position: { x: -25, y: 2, z: 23.9 },
						rotation: MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), 180 * MRE.DegreesToRadians)
					}
				},
				text: {
					contents: "SET ONE=>",
					anchor: MRE.TextAnchorLocation.MiddleCenter,
					color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
					height: 0.1
				}
			}
		});
		

		// Load a glTF model before we use it
		const cubeData = await this.assets.loadGltf('altspace-cube.glb', "box");

		// spawn a copy of the glTF model
		this.Set_One = MRE.Actor.CreateFromPrefab(this.context, {
			// using the data we loaded earlier
			firstPrefabFrom: cubeData,
			// Also apply the following generic actor properties.
			actor: {
				name: 'Altspace Cube',
				// Parent the glTF model to the text actor, so the transform is relative to the text
				parentId: this.text.id,
				transform: {
					local: {
						position: { x: 0.7, y: 0.02, z: 0 },
						scale: { x: 0.3, y: 0.1, z: 0.01 }
					}
				}
			}
		});

		this.text = MRE.Actor.Create(this.context, {
			actor: {
				name: 'Text',
				transform: {
					app: {
						position: { x: -25, y: 1.7, z: 23.9 },
						rotation: MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), 180 * MRE.DegreesToRadians)
					}
				},
				text: {
					contents: "SET TWO=>",
					anchor: MRE.TextAnchorLocation.MiddleCenter,
					color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
					height: 0.1
				}
			}
		});


		// Load a glTF model before we use it
		const cubeData2 = await this.assets.loadGltf('altspace-cube.glb', "box");

		// spawn a copy of the glTF model
		this.Set_Two = MRE.Actor.CreateFromPrefab(this.context, {
			// using the data we loaded earlier
			firstPrefabFrom: cubeData2,
			// Also apply the following generic actor properties.
			actor: {
				name: 'Altspace Cube',
				// Parent the glTF model to the text actor, so the transform is relative to the text
				parentId: this.text.id,
				transform: {
					local: {
						position: { x: 0.7, y: 0.02, z: 0 },
						scale: { x: 0.3, y: 0.1, z: 0.01 }
					}
				}
			}
		});
		

		this.text = MRE.Actor.Create(this.context, {
			actor: {
				name: 'Text',
				transform: {
					app: {
						position: { x: -25, y: 1.4, z: 23.9 },
						rotation: MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), 180 * MRE.DegreesToRadians)
					}
				},
				text: {
					contents: "SET THREE=>",
					anchor: MRE.TextAnchorLocation.MiddleCenter,
					color: { r: 30 / 255, g: 206 / 255, b: 213 / 255 },
					height: 0.1
				}
			}
		});


		// Load a glTF model before we use it
		const cubeData3 = await this.assets.loadGltf('altspace-cube.glb', "box");

		// spawn a copy of the glTF model
		this.Set_Three = MRE.Actor.CreateFromPrefab(this.context, {
			// using the data we loaded earlier
			firstPrefabFrom: cubeData3,
			// Also apply the following generic actor properties.
			actor: {
				name: 'Altspace Cube',
				// Parent the glTF model to the text actor, so the transform is relative to the text
				parentId: this.text.id,
				transform: {
					local: {
						position: { x: 0.7, y: 0.02, z: 0 },
						scale: { x: 0.3, y: 0.1, z: 0.01 }
					}
				}
			}
		});

		const btnSetOne = this.Set_One.setBehavior(MRE.ButtonBehavior);
		const btnSetTwo = this.Set_Two.setBehavior(MRE.ButtonBehavior);
		const btnSetThree = this.Set_Three.setBehavior(MRE.ButtonBehavior);
		// Trigger the grow/shrink animations on hover.
		btnSetOne.onHover('enter', () => {
			// use the convenience function "AnimateTo" instead of creating the animation data in advance
			MRE.Animation.AnimateTo(this.context, this.Set_One, {
				destination: { transform: { local: { scale: { x: 0.4, y: 0.2, z: 0.01 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});
		btnSetOne.onHover('exit', () => {
			MRE.Animation.AnimateTo(this.context, this.Set_One, {
				destination: { transform: { local: { scale: { x: 0.3, y: 0.1, z: 0.01 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});
		btnSetTwo.onHover('enter', () => {
			// use the convenience function "AnimateTo" instead of creating the animation data in advance
			MRE.Animation.AnimateTo(this.context, this.Set_Two, {
				destination: { transform: { local: { scale: { x: 0.4, y: 0.2, z: 0.01 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});
		btnSetTwo.onHover('exit', () => {
			MRE.Animation.AnimateTo(this.context, this.Set_Two, {
				destination: { transform: { local: { scale: { x: 0.3, y: 0.1, z: 0.01 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});

		btnSetThree.onHover('enter', () => {
			// use the convenience function "AnimateTo" instead of creating the animation data in advance
			MRE.Animation.AnimateTo(this.context, this.Set_Three, {
				destination: { transform: { local: { scale: { x: 0.4, y: 0.2, z: 0.01 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});
		btnSetThree.onHover('exit', () => {
			MRE.Animation.AnimateTo(this.context, this.Set_Three, {
				destination: { transform: { local: { scale: { x: 0.3, y: 0.1, z: 0.01 } } } },
				duration: 0.3,
				easing: MRE.AnimationEaseCurves.EaseOutSine
			});
		});


		

		btnSetOne.onClick(_ => {
			this.Set_One.created().then(() => {
			//	this.ContainerActor.created().then(() => {
				//	this.ContainerActor.destroy();
				//	});
				if (this.ContainerActor !== null) {
					this.ContainerActor.destroy();
				}
				const controllerPos: MRE.Vector3 = new MRE.Vector3(-22.4, -0.06843245, 26.5);
				const controllerscale: MRE.Vector3 = new MRE.Vector3(1, 1, 1);
				const controllerRot: MRE.Quaternion =
					MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), 0 * MRE.DegreesToRadians);
				this.ContainerActor = this.CreateKit("Set_One > Set 1", "artifact:1921000151472668684",
					controllerPos, controllerscale, controllerRot)

			});
		});
		btnSetTwo.onClick(_ => {
			this.Set_Two.created().then(() => {
			//	this.ContainerActor.created().then(() => {
				//	this.ContainerActor.destroy();
				//});
				if (this.ContainerActor !== null) {
					this.ContainerActor.destroy();
				}
				const controllerPos: MRE.Vector3 = new MRE.Vector3(-25.2, -0.4810161, 43.5);
				const controllerscale: MRE.Vector3 = new MRE.Vector3(1, 1, 1);
				const controllerRot: MRE.Quaternion =
					MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), 180.0 * MRE.DegreesToRadians);
				this.ContainerActor=this.CreateKit("Set_Two > Set 2","artifact:1921000848129786259",
					controllerPos, controllerscale, controllerRot)

			});
		});
		btnSetThree.onClick(_ => {
			this.Set_Three.created().then(() => {
				//this.ContainerActor.created().then(() => {
					//this.ContainerActor.destroy();
				//});
				if (this.ContainerActor !== null) {
					this.ContainerActor.destroy();
				}
				const controllerPos: MRE.Vector3 = new MRE.Vector3(-25.2, -0.4810161, 43.5);
				const controllerscale: MRE.Vector3 = new MRE.Vector3(1,1, 1);
				const controllerRot: MRE.Quaternion =
					MRE.Quaternion.RotationAxis(MRE.Vector3.Up(), 180.0 * MRE.DegreesToRadians);
				this.ContainerActor=this.CreateKit("Set_Three > Set 3","artifact:1921001420669059777",
					controllerPos, controllerscale, controllerRot)

			});
			  
		});

		
	}
	private CreateKit(name: string, artifactID: string, kitPos: MRE.Vector3,
		kitScale: MRE.Vector3, kitRot: MRE.Quaternion): MRE.Actor {
		return MRE.Actor.CreateFromLibrary(this.context, {
			resourceId: artifactID,
			actor: {
				name: name,
				transform: {
					local: {
						position: kitPos,
						scale: kitScale,
						rotation: kitRot
					}
				}
			}
		});

	}

	/**
	 * Generate keyframe data for a simple spin animation.
	 * @param duration The length of time in seconds it takes to complete a full revolution.
	 * @param axis The axis of rotation in local space.
	 */
	private generateSpinKeyframes(duration: number, axis: MRE.Vector3): Array<MRE.Keyframe<MRE.Quaternion>> {
		return [{
			time: 0 * duration,
			value: MRE.Quaternion.RotationAxis(axis, 0)
		}, {
			time: 0.25 * duration,
			value: MRE.Quaternion.RotationAxis(axis, Math.PI / 2)
		}, {
			time: 0.5 * duration,
			value: MRE.Quaternion.RotationAxis(axis, Math.PI)
		}, {
			time: 0.75 * duration,
			value: MRE.Quaternion.RotationAxis(axis, 3 * Math.PI / 2)
		}, {
			time: 1 * duration,
			value: MRE.Quaternion.RotationAxis(axis, 2 * Math.PI)
		}];
	}
}
