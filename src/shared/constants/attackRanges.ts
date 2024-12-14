const ATTACK_RANGES = new Map<[number, string], [number, string][]>([
  [
    [0, 'red'],
    [
      [1, 'red'],
      [3, 'red'],
      [4, 'red'],
    ],
  ],
  [
    [1, 'red'],
    [
      [0, 'red'],
      [2, 'red'],
      [3, 'red'],
      [4, 'red'],
      [5, 'red'],
    ],
  ],
  [
    [2, 'red'],
    [
      [1, 'red'],
      [4, 'red'],
      [5, 'red'],
    ],
  ],
  [
    [3, 'red'],
    [
      [0, 'red'],
      [1, 'red'],
      [4, 'red'],
      [0, 'orange'],
      [1, 'orange'],
    ],
  ],
  [
    [4, 'red'],
    [
      [0, 'red'],
      [1, 'red'],
      [2, 'red'],
      [3, 'red'],
      [5, 'red'],
      [0, 'orange'],
      [1, 'orange'],
      [2, 'orange'],
    ],
  ],
  [
    [5, 'red'],
    [
      [1, 'red'],
      [2, 'red'],
      [4, 'red'],
      [1, 'orange'],
      [2, 'orange'],
    ],
  ],
  [
    [0, 'orange'],
    [
      [1, 'orange'],
      [3, 'orange'],
      [4, 'orange'],
      [3, 'red'],
      [4, 'red'],
    ],
  ],
  [
    [1, 'orange'],
    [
      [0, 'orange'],
      [2, 'orange'],
      [3, 'orange'],
      [4, 'orange'],
      [5, 'orange'],
      [3, 'red'],
      [4, 'red'],
      [5, 'red'],
    ],
  ],
  [
    [2, 'orange'],
    [
      [1, 'orange'],
      [4, 'orange'],
      [5, 'orange'],
      [4, 'red'],
      [5, 'red'],
    ],
  ],
  [
    [3, 'orange'],
    [
      [0, 'orange'],
      [1, 'orange'],
      [4, 'orange'],
    ],
  ],
  [
    [4, 'orange'],
    [
      [0, 'orange'],
      [1, 'orange'],
      [2, 'orange'],
      [3, 'orange'],
      [5, 'orange'],
    ],
  ],
  [
    [5, 'orange'],
    [
      [1, 'orange'],
      [2, 'orange'],
      [4, 'orange'],
    ],
  ],
]);

export default ATTACK_RANGES;
