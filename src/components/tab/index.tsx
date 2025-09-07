import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import { cn } from '../../lib/utils';
import { Grid } from '@mui/material';
import React, { useState, useEffect } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  subText?: string;
  subActive?: boolean;
  render?: boolean;
  xs?: number;
  disabled?: boolean;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface ToggleButtonProps {
  buttons: ButtonProps[];
  mt?: boolean;
  columns: number;
  mobile?: boolean;
  onClose?: () => void;
  initialOption?: number;
  activeTab?: number;
  onChangeTab?: (index: number) => void;
}

export default function TabsComponent({
  buttons,
  mt,
  columns,
  mobile = false,
  onClose,
  initialOption = 0,
  activeTab,
  onChangeTab,
}: Readonly<ToggleButtonProps>) {
  const [activeKey, setActiveKey] = useState(buttons[initialOption]?.text || '');

  useEffect(() => {
    if (activeTab !== undefined && buttons[activeTab]) {
      setActiveKey(buttons[activeTab].text);
    }
  }, [activeTab, buttons]);

  return (
    <Grid
      container
      columns={mobile ? 1 : columns}
      className={cn(mt ? 'mt-4' : '')}
      style={{ maxWidth: `calc(8rem * ${mobile ? 2 : columns})` }}
    >
      <Tabs
        activeKey={activeKey}
        onSelect={(key) => {
          setActiveKey(key || '');
          if (onClose) {
            onClose();
          }
          const selectedButtonIndex = buttons.findIndex(button => button.text === key);
          if (onChangeTab && selectedButtonIndex !== -1) {
            onChangeTab(selectedButtonIndex);
          }
          if (buttons[selectedButtonIndex]?.disabled) return;
          const selectedButton = buttons.find(button => button.text === key);
          if (selectedButton && selectedButton.onClick) {
            selectedButton.onClick();
          }
        }}
        className="mb-3"
      >
        {buttons.map((v) => {
          const {
            subActive = false,
            subText = '',
            text,
            render = true,
            xs = text.split(' ').length,
            disabled,
            ...rest
          } = v;

          return render ? (
            <Tab eventKey={text} title={subActive && subText ? subText : text} key={text}>
              <Grid item xs={xs} className={cn({ 'px-1': mobile })}>
                <button
                  {...rest}
                  disabled={disabled}
                >
                </button>
              </Grid>
            </Tab>
          ) : null;
        })}
      </Tabs>
    </Grid>
  );
}
