import create from 'zustand/vanilla';
import { subscribeWithSelector } from 'zustand/middleware';
import type { Flow, Block } from '@dopt/javascript-common';

export type Blocks = Record<Block['uid'], Block>;
export type Flows = Record<Flow['sid'], Flow>;

export const blockStore = create(subscribeWithSelector<Blocks>(() => ({})));
export const flowStore = create(subscribeWithSelector<Flows>(() => ({})));
