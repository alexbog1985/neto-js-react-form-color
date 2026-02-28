import React, {useEffect, useState} from "react"

function Form() {

  const [form, setForm] = useState(
    {
      hex: '#',
      rgb: 'rgb(255, 255, 255)',
      error: false
    }
  );

  const hexToRgb = (hex: string): string | null => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? `rgb(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)})`
      : null;
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    if (!value.startsWith('#') && value.length > 0) {
      value = '#' + value;
    }
    if (value.length < 7) {
      setForm(prev => ({...prev, hex: value, error: false}));
      return;
    }
    if (value.length === 7) {
      const rgbValue = hexToRgb(value);
      if (rgbValue) {
        setForm({hex: value, rgb: rgbValue, error: false});
      } else {
        setForm({hex: value, rgb: 'Ошибка!', error: true});
      }
    }
  };

  useEffect(() => {
    document.body.style.backgroundColor = form.error ? 'red' : form.rgb;
  }, [form.rgb, form.error]);

  return (
    <>
      <label className="container">
        <input
          type="text"
          className="input-field"
          id="colorInput"
          maxLength={7}
          placeholder="Введите код цвета..."
          value={form.hex}
          onChange={handleChange}
        />
        <span className="result" id="result">{form.error ? 'Ошибка!' : form.rgb}</span>
      </label>
    </>
  )
}

export default Form