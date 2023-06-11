
import React, { useState } from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

const TreeComponent = () => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const nodes = [
    {
      value: 'mars',
      label: 'Mars',
      children: [
        { value: 'phobos', label: 'Phobos' },
        { value: 'deimos', label: 'Deimos' },
      ],
    },
    {
      value: 'jupiter',
      label: 'Jupiter',
      children: [
        {
          value: 'io',
          label: 'Io',
          children: [
            { value: 'io-subtask-1', label: 'Io Subtask 1' },
            { value: 'io-subtask-2', label: 'Io Subtask 2' },
          ],
        },
        {
          value: 'europa',
          label: 'Europa',
          children: [
            { value: 'europa-subtask-1', label: 'Europa Subtask 1' },
            { value: 'europa-subtask-2', label: 'Europa Subtask 2' },
          ],
        },
      ],
    },
  ];

  const onCheck = (checkedNodes) => {
    console.log('Checked nodes:', checkedNodes);
    setChecked(checkedNodes);
  };

  return (
    <div>
      <CheckboxTree
        nodes={nodes}
        checked={checked}
        expanded={expanded}
        onCheck={onCheck}
        onExpand={(expandedNodes) => setExpanded(expandedNodes)}
      />
    </div>
  );
};

export default TreeComponent;

