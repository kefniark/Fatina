import { Fatina } from '../../fatina';
import { ISequence } from '../interfaces/ISequence';
import { ITween } from '../interfaces/ITween';

export interface IFatinaPluginBezier extends Fatina {
	curve: (obj: any, settings?: ICurveParams | any) => ITween;
	arc: (obj: any, settings?: IArcParams | any) => ITween;
	path: (obj: any, settings?: IPathParams | any) => ISequence;
}

export const enum BezierType {
	Cubic = 'cubic',
	Quadratic = 'quadratic',
	Catmull = 'catmull'
}

export const enum PathType {
	Linear = 'linear',
	Catmull = 'catmull'
}

export interface IVector2 {
	x: number;
	y: number;
}

export interface ICircle {
	x: number;
	y: number;
	r: number;
}

export interface ICurveParams {
	posX: string;
	posY: string;
	rot: string;
	rotAdd: number;
	autoRotate: boolean;
	from: IVector2;
	to: IVector2;
	ctr1: IVector2;
	ctr2: IVector2;
	duration: number;
	method: BezierType | string;
}

export interface IArcParams {
	posX: string;
	posY: string;
	rot: string;
	rotAdd: number;
	autoRotate: boolean;
	ctr1: IVector2;
	to: IVector2;
	duration: number;
}

export interface IPathParams {
	posX: string;
	posY: string;
	points: IVector2[];
	duration: number;
	method: PathType;
}
