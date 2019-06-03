import React from 'react';

export default (props) => (
    <div className="form-group">
      <label className="label">{props.title}</label>
      <div className="">
        <input
          name={props.name}
          className="input"
          type={props.type || 'text'}
          value={props.value}
          onChange={props.onChange}
          autoComplete="off"
          onBlur={props.onBlur}
        />
  
  
        {props.touch && props.error && (
          <span className="icon is-small is-right">
            <i className="fa fa-times fa-lg text-danger ml-1"></i>
          </span>
        )}
  
        {props.touch && !props.error && (
          <span className="icon is-small is-right">
            <i className="fa fa-check fa-lg text-success ml-1"></i>
          </span>
        )}
  
        {props.touch && props.error && (
          <p className="text-danger">{props.title} es un campo obligatorio</p>
        )}
      </div>
    </div>
  );
  