import './App.css';

export const PReg = () => {

    return (

        <div className="container">
            <header>Patient Registration</header>
            <form>
                <div className="form">
                    <div className="A">
                        <span className="title">Section A</span>
                        <div className="fields1">
                            <div className="input-field" onload="setMaxDate()">
                                <label htmlFor="date">Admission Date : </label>
                                <input type="date"/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="time">Admission Time : </label>
                                <input type="time"/>
                            </div>
                        </div>

                        <div className="fields">
                            <div className="input-field">
                                <label htmlFor="fullname">Fullname : </label>
                                <input type="text" placeholder="Enter text here"/>
                            </div>
                            <div className="input-field">
                                <label htmlFor="address">Address : </label>
                                <input type="text" placeholder="Enter text here"/>
                            </div>                             
                        </div>

                        <div className="fields">
                            <div className="input-fieldN">
                                <label htmlFor="nic">NIC No. : </label>
                                <input type="text" placeholder="Enter number here"/>
                            </div>
                            <div className="input-fieldN">
                                <label htmlFor="phn">PHN No. : </label>
                                <input type="text" placeholder="Enter number here"/>
                            </div>   
                            <div className="input-fieldN">
                                <label htmlFor="telephone">Telephone No. : </label>
                                <input type="text" placeholder="Enter number here"/>
                            </div>                              
                        </div>
                        
                    </div>

                    <div className="B">
                        <span className="title">Section B</span>
                        <div className="fields">
                            <div className="input-fieldH">
                                <label htmlFor="bht">BHT : </label>
                                <input type="text" placeholder="..."/>
                            </div>   
                            <div className="input-fieldH">
                                <label htmlFor="ward">Ward No. : </label>
                                <input type="text" placeholder="..."/>
                            </div>   
                            <div className="input-fieldC">
                                <label htmlFor="consultant_name">Consultant Name : </label>
                                <select name="consultant" id="consultant">
                                    <option value="">Select here</option>
                                    <option value="x">Dr.X</option>
                                    <option value="y">Dr.Y</option>
                                    <option value="z">Dr.Z</option>
                                </select>
                            </div>
                            
                            <div className="input-field">
                                <label htmlFor="medical_history">Past Medical History : </label>
                                <textarea id="medical_history" placeholder="Enter text here" name="medical_history" rows="3" cols="50"></textarea>
                            </div>   
                            <div className="input-field">
                                <label htmlFor="surgical_history">Past Surgical History : </label>
                                <textarea id="surgical_history" placeholder="Enter text here" name="surgical_history" rows="3" cols="50"></textarea>
                            </div> 
                            <div className="input-field">
                                <label htmlFor="ca">Family Hx of CA : </label>
                                <textarea id="ca" placeholder="Enter text here" name="ca" rows="3" cols="50"></textarea>
                            </div>   
                            <div className="input-field">
                                <label htmlFor="past_gyn">Past Gyn Hx : </label>
                                <textarea id="past_gyn" placeholder="Enter text here" name="past_gyn" rows="3" cols="50"></textarea>
                            </div> 
                            <div className="input-field">
                                <label htmlFor="past_obs">Past Obs Hx : </label>
                                <textarea id="past_obs" placeholder="Enter text here" name="past_obs" rows="3" cols="50"></textarea>
                            </div>    
                            <div className="input-fieldR">
                                <label htmlFor="bht">Allergy Hx : </label>
                                <input type="radio" id="yes" name="allergy" value="Yes"/>
                                <label for="yes">Yes</label>
                                <input type="radio" id="no" name="allergy" value="No"/>
                                <label for="no">No</label>
                            </div> 
                            <div className="input-fieldH">
                                <label htmlFor="height">Height : </label>
                                <input type="text" placeholder="..."/>
                            </div>
                            <div className="input-fieldH">
                                <label htmlFor="weight">Weight : </label>
                                <input type="text" placeholder="..."/>
                            </div>   
                            <div className="input-fieldH">
                                <label htmlFor="bmi">BMI : </label>
                                <input type="text" placeholder="..."/>
                            </div>                   
                        </div>
                    </div>
                </div>
            </form>
        </div>
        
    )
}
