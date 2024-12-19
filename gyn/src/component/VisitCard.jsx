import React from 'react';
import axios from 'axios';
import '../home.css';
import { useState, useEffect } from 'react';


const VisitCard = () =>{

    const [data, setData] = useState([]);

    let patient_phn = localStorage.getItem('patient_phn');

    useEffect(() => {
        const fetchData = async () => {
        const add_count = parseInt(localStorage.getItem('addCount'), 10); // Ensure parsing here
        const visit_count = parseInt(localStorage.getItem('visitIndex'), 10); // Ensure parsing here
        const visit_unique = patient_phn + "_" + add_count + "_" + visit_count;
        // console.log(visit_unique);

        if (isNaN(visit_count)) {
            console.error("Invalid add_count value.");
            return; // Prevent further execution if add_count is not valid

        }

        try {
            console.log(visit_unique);

            const response = await axios.get(`http://localhost:5000/visit/visitdetail/${visit_unique}`);
            setData(response.data); // Assuming response.data is the correct structure
            console.log(response.data);

        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        if (patient_phn) {
            fetchData();
        }
    }, [patient_phn]);

    return(
        <div className='card1'>
            <div className='profile'>
                <div>
                    <span className="title">Visit Details</span>
                    <div className='row'>
                        <div className='col1'>Visit Count</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.visit_count}</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Date</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.date}</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Seen By</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.seen_by}</div>
                    </div>

                    <span className="title">Complaints</span>

                    <div className='row'>
                        <div className='col1'>Complaints</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.complaints}</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Abnormal Bleeding</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.abnormal_bleeding}</div>
                    </div>

                    <span className="title">Examination</span>

                    <div className='row'>
                        <div className='col1'>Blood Presure Low</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.exam_bpa} mmHg</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Blood Presure High</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.exam_bpb} mmHg</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Pulse Rate</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.exam_pulse} bpm</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Abdominal Examination</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.exam_abdominal}</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Gynaecology Examination</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.exam_gynaecology}</div>
                    </div>

                    <span className="title">Management</span>

                    <div className='row'>
                        <div className='col1'>Minor EUA</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.manage_minor_eua}</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Minor EB</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.manage_minor_eb}</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Major Management</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.manage_major}</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Medical Management</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.manage_medical}</div>
                    </div>
                    <div className='row'>
                        <div className='col1'>Surgical Management</div>
                        <div className='col2'>:</div>
                        <div className='col3'>{data.manage_surgical}</div>
                    </div>
                </div>

                <span className="title">Investigation</span>
                <div className='invest'>
                    <div>
                        <div className='rowL'>
                            <div className='colL1'>WBC</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.fbc_wbc} mm³</div>

                        </div>
                        <div className='rowL'>
                            <div className='colL1'>Hb</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.fbc_hb} g/dL</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>P/t</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.fbc_pt}mm³</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>White Cells</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.ufr_wc} /hpf</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>Red Cells</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.ufr_rc} /hpf</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>Protein</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.ufr_protein}</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>K+</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.se_k} mmol/L</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>Na+</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.se_na} mmol/L</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>CRP</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.crp} mg/L</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>FBS</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.fbs} mmol/L</div>
                        </div>
                    </div>
                    <div>
                        <div className='rowL'>
                            <div className='colL1'>PPBS AB</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.ppbs_ab}</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>PPBS AL</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.ppbs_al}</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>PPBS AD</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.ppbs_ad}</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>LFT ALT</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.lft_alt} U/L</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>LFT AST</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.lft_ast} U/L</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>Other Investigation</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.invest_other}</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>MRI</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.scan_mri}</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>CT</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.scan_ct}</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>USS TAS</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.uss_tas}</div>
                        </div>
                        <div className='rowL'>
                            <div className='colL1'>USS TUS</div>
                            <div className='colL2'>:</div>
                            <div className='colL3'>{data.uss_tus}</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )

}

export default VisitCard;