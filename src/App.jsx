import { useState } from "react";

const C = {
  navy:"#0D1B2A", teal:"#1D9E75", tealBg:"#E1F5EE",
  amber:"#BA7517", amberBg:"#FAEEDA",
  red:"#A32D2D", redBg:"#FCEBEB",
  green:"#3B6D11", greenBg:"#EAF3DE",
  purple:"#534AB7", purpleBg:"#EEEDFE",
  blue:"#185FA5", blueBg:"#E6F1FB",
  surf:"#F4F7FA", bdr:"rgba(0,0,0,0.12)", muted:"#6B7A8D",
  white:"var(--color-background-primary)",
  line:"#06C755", linedk:"#075E54",
};

const CUSTS_INIT = [
  {id:1,name:"คุณสมชาย",biz:"ABC Trading",type:"monthly",svc:"บัญชีรายเดือนนิติบุคคล",status:"B",price:4000,src:"Facebook",by:"แมน",paid:true,docRisk:false,pipe:"ลูกค้าปัจจุบัน",bizType:"SME"},
  {id:2,name:"คุณวิภา",biz:"ร้านวิภาขนม",type:"annual",svc:"ยื่นภาษีรายปี",status:"A",price:0,src:"TikTok",by:"-",paid:false,docRisk:true,pipe:"รอเอกสาร",bizType:"บุคคลธรรมดา"},
  {id:3,name:"คุณประสิทธิ์",biz:"PS Logistics",type:"monthly",svc:"ปิดงบ (ผู้สอบบัญชี)",status:"B",price:12000,src:"Referral",by:"แมน",paid:true,docRisk:true,pipe:"ลูกค้าปัจจุบัน",bizType:"SME"},
  {id:4,name:"คุณเพชร",biz:"Diamond Property",type:"company",svc:"จดบริษัท",status:"C",price:8500,src:"Line OA",by:"พิม",paid:true,docRisk:false,pipe:"กลับมาซ้ำ",bizType:"บริษัทขนาดกลาง"},
  {id:5,name:"คุณธนา",biz:"TN Import",type:"company",svc:"จด หจก",status:"D",price:0,src:"Google",by:"-",paid:false,docRisk:false,pipe:"ตามเก่า",bizType:"SME"},
  {id:6,name:"คุณนิภา",biz:"NP Beauty",type:"annual",svc:"ยื่นภาษีรายปี",status:"B",price:3000,src:"Instagram",by:"พิม",paid:true,docRisk:false,pipe:"ลูกค้าปัจจุบัน",bizType:"บุคคลธรรมดา"},
  {id:7,name:"คุณอรุณ",biz:"Sunrise Café",type:"monthly",svc:"บัญชีรายเดือนบุคคล",status:"A",price:0,src:"Facebook",by:"แมน",paid:false,docRisk:false,pipe:"รอโทร",bizType:"SME"},
];

const SM = {
  A:{l:"สอบถามใหม่",c:C.amber,bg:C.amberBg},
  B:{l:"ลูกค้าปัจจุบัน",c:C.green,bg:C.greenBg},
  C:{l:"กลับมาซ้ำ",c:C.purple,bg:C.purpleBg},
  D:{l:"หายไป >90วัน",c:C.red,bg:C.redBg},
};
const TM = {
  monthly:{l:"ทำรายเดือน",c:C.teal,bg:C.tealBg},
  company:{l:"จดบริษัท/หจก",c:C.purple,bg:C.purpleBg},
  annual:{l:"ยื่นภาษีรายปี",c:C.amber,bg:C.amberBg},
};
const SALESPEOPLE = [
  {name:"แมน",c:C.teal,targets:[{l:"บัญชีรายเดือน",d:50,t:500},{l:"ยื่นภาษีรายปี",d:74,t:300},{l:"จดบริษัท",d:28,t:105}]},
  {name:"พิม",c:C.purple,targets:[{l:"บัญชีรายเดือน",d:112,t:400},{l:"บัญชีบุคคล",d:67,t:200},{l:"จด หจก",d:22,t:80}]},
];
const CHURN = [
  {name:"คุณธนา",svc:"จด หจก",reason:"ราคาสูง",month:"มิ.ย."},
  {name:"คุณอ้อ",svc:"บัญชีรายเดือน",reason:"ติดต่อยาก",month:"พ.ค."},
  {name:"คุณบอย",svc:"วางแผนภาษี",reason:"ราคาสูง",month:"พ.ค."},
  {name:"คุณมาย",svc:"จดบริษัท",reason:"เปลี่ยนใจ",month:"เม.ย."},
  {name:"คุณปาล์ม",svc:"บัญชีรายเดือน",reason:"ติดต่อยาก",month:"เม.ย."},
];
const SVCS = ["บัญชีรายเดือนนิติบุคคล","บัญชีรายเดือนบุคคล","ปิดงบ (ผู้สอบบัญชี)","บัญชีภายใน","ออดิตตรวจนับคลัง","วางระบบบัญชี","ยื่นภาษีรายปี","จดบริษัท","จด หจก","ปิดบริษัท","ทำวีซ่า","รับเปิด Holding"];
const DOCS = ["หนังสือรับรอง","ภ.พ.20","บัตรประชาชน","สำเนาทะเบียนพาณิชย์","งบการเงิน","เดินบัญชี"];
const PIPE_COLS = [
  {key:"นัดคุย",c:"#378ADD"},{key:"รอโทร",c:C.amber},{key:"รอตัดสินใจ",c:C.purple},
  {key:"รอเอกสาร",c:C.red},{key:"ลูกค้าปัจจุบัน",c:C.green},
  {key:"กลับมาซ้ำ",c:C.teal},{key:"ตามเก่า",c:"#888780"},
];
const INIT_MSGS = [
  {from:"sys",text:"วันนี้ 09:00"},
  {from:"alert",text:"AI แจ้งเตือน: คุณวิภา ค้างเอกสาร 7 วัน — โปรดติดตามค่ะ"},
  {from:"l",who:"ลูกค้าใหม่",text:"สวัสดีค่ะ อยากสอบถามราคาทำบัญชีรายเดือนค่ะ",time:"09:10"},
  {from:"r",who:"แมน",text:"สวัสดีค่ะ แมนนี่จาก Finovas ค่ะ ธุรกิจอะไรคะ?",time:"09:11"},
  {from:"l",who:"ลูกค้า",text:"ร้านขายของออนไลน์ค่ะ ยอดเดือนละ ~100,000 บาทค่ะ",time:"09:12"},
  {from:"r",who:"แมน",text:"SME เลยค่ะ แนะนำแพ็ก 3,500–4,500 บาท/เดือน ครอบคลุม VAT + งบรายไตรมาสค่ะ สนใจนะคะ?",time:"09:13"},
  {from:"l",who:"ลูกค้า",text:"ตกลงเลยค่ะ!",time:"09:14"},
];

function pct(d,t){ return t ? Math.min(100,Math.round(d/t*100)) : 0; }

function Pill({children, c, bg, style={}}){
  return <span style={{background:bg,color:c,borderRadius:20,padding:"2px 9px",fontSize:10,fontWeight:500,whiteSpace:"nowrap",display:"inline-block",...style}}>{children}</span>;
}
function Card({children,style={}}){
  return <div style={{background:C.white,borderRadius:12,border:`0.5px solid ${C.bdr}`,padding:14,marginBottom:10,...style}}>{children}</div>;
}
function CTitle({children}){
  return <div style={{fontSize:12,fontWeight:500,color:"var(--color-text-primary)",marginBottom:10}}>{children}</div>;
}
function BarRow({label,val,total,color,labelWidth=80}){
  const p=pct(val,total);
  return(
    <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:6}}>
      <span style={{fontSize:10,color,minWidth:labelWidth,fontWeight:500}}>{label}</span>
      <div style={{flex:1,height:5,background:C.surf,borderRadius:3,overflow:"hidden"}}>
        <div style={{width:`${p}%`,height:"100%",background:color,borderRadius:3,transition:"width .3s"}}/>
      </div>
      <b style={{fontSize:11,color:"var(--color-text-primary)",minWidth:20,textAlign:"right"}}>{val}</b>
    </div>
  );
}

// ── LINE Chat ──────────────────────────────────────────────────────────────────
function ChatBubble({m}){
  if(m.from==="sys") return(
    <div style={{textAlign:"center",margin:"2px 0"}}>
      <span style={{background:"rgba(255,255,255,.7)",borderRadius:8,fontSize:10,color:"#5D4037",padding:"3px 10px",display:"inline-block"}}>{m.text}</span>
    </div>
  );
  if(m.from==="alert") return(
    <div style={{textAlign:"center",margin:"3px 0"}}>
      <span style={{background:"#FFF3E0",border:"1px solid #FFE08270",borderRadius:8,fontSize:10,color:"#E65100",padding:"4px 10px",display:"inline-block"}}>{m.text}</span>
    </div>
  );
  const isRight = m.from==="r";
  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:isRight?"flex-end":"flex-start",marginBottom:4}}>
      {m.who && <span style={{fontSize:9,color:"#667781",marginBottom:2,padding:"0 3px"}}>{m.who}</span>}
      <div style={{
        background:isRight?"#DCF8C6":"#fff",
        borderRadius:isRight?"12px 2px 12px 12px":"2px 12px 12px 12px",
        padding:"7px 11px",fontSize:11.5,lineHeight:1.55,
        maxWidth:"85%",whiteSpace:"pre-wrap",color:"#111",
      }}>{m.text}</div>
      {m.time && <span style={{fontSize:9,color:"#667781",marginTop:2,padding:"0 3px"}}>{m.time}</span>}
    </div>
  );
}

// ── Form Steps ─────────────────────────────────────────────────────────────────
function FormPanel({onSubmit, onClose}){
  const [step, setStep] = useState(1);
  const [fd, setFd] = useState({
    name:"",biz:"",svc:"",bizType:"",vat:"",
    startDate:"",revenue:"",docCount:"",employees:"",price:"",
    docsGot:[],docsMissing:"",concern:"",promise:"",note:""
  });
  const set=(k,v)=>setFd(f=>({...f,[k]:v}));

  const fi = {width:"100%",border:`0.5px solid ${C.bdr}`,borderRadius:7,padding:"6px 9px",fontSize:12,fontFamily:"inherit",outline:"none",background:"var(--color-background-primary)",color:"var(--color-text-primary)",boxSizing:"border-box",marginBottom:0};
  const lbl = {fontSize:10,fontWeight:500,color:"var(--color-text-secondary)",marginBottom:3,display:"block"};

  function FL({t,req}){ return <label style={lbl}>{t}{req&&<span style={{color:C.red}}> *</span>}</label>; }
  function FI({label,fkey,placeholder,type="text",req}){
    return <div style={{marginBottom:8}}><FL t={label} req={req}/><input type={type} value={fd[fkey]} onChange={e=>set(fkey,e.target.value)} placeholder={placeholder} style={fi}/></div>;
  }

  const Steps = ()=>(
    <div style={{display:"flex",gap:4,marginBottom:12}}>
      {[1,2,3].map(n=><div key={n} style={{flex:1,height:3,borderRadius:2,background:n<=step?C.line:"#DDD",transition:"background .2s"}}/>)}
    </div>
  );
  const BtnRow = ({onBack,onNext,nextLabel="ถัดไป →"})=>(
    <div style={{display:"flex",gap:7,marginTop:10}}>
      {onBack && <button onClick={onBack} style={{flex:1,background:"var(--color-background-secondary)",color:"var(--color-text-primary)",border:`0.5px solid ${C.bdr}`,borderRadius:8,padding:9,cursor:"pointer",fontFamily:"inherit",fontSize:12}}>← ย้อนกลับ</button>}
      <button onClick={onNext} style={{flex:2,background:C.line,color:"#fff",border:"none",borderRadius:8,padding:9,cursor:"pointer",fontFamily:"inherit",fontWeight:500,fontSize:12}}>{nextLabel}</button>
    </div>
  );

  const save1=()=>{
    if(!fd.name){alert("กรุณากรอกชื่อลูกค้าค่ะ");return;}
    if(!fd.svc){alert("กรุณาเลือกบริการค่ะ");return;}
    setStep(2);
  };
  const save2=()=>setStep(3);
  const submit=()=>{ onSubmit({...fd}); };

  return(
    <div style={{background:"var(--color-background-primary)",borderTop:`2px solid ${C.line}`,display:"flex",flexDirection:"column",maxHeight:360}}>
      <div style={{background:C.linedk,color:"#fff",padding:"9px 14px",display:"flex",alignItems:"center",gap:8,flexShrink:0}}>
        <span style={{flex:1,fontSize:12,fontWeight:500}}>
          {step===1?"กรอกข้อมูลลูกค้า (1/3)":step===2?"ข้อมูลธุรกิจ & ราคา (2/3)":"รายละเอียดเพิ่มเติม (3/3)"}
        </span>
        <button onClick={onClose} style={{background:"none",border:"none",color:"#fff",cursor:"pointer",fontSize:16,lineHeight:1}}>✕</button>
      </div>
      <div style={{padding:"12px 14px",overflowY:"auto",flex:1}}>
        <Steps/>
        {step===1 && <>
          <FI label="ชื่อลูกค้า" fkey="name" placeholder="คุณ..." req/>
          <FI label="ชื่อกิจการ" fkey="biz" placeholder="บริษัท / ร้านค้า..."/>
          <div style={{marginBottom:8}}>
            <FL t="บริการ" req/>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:4}}>
              {SVCS.map(s=>(
                <button key={s} onClick={()=>set("svc",s)}
                  style={{border:`0.5px solid ${fd.svc===s?C.line:C.bdr}`,borderRadius:7,padding:"5px 7px",fontSize:10.5,cursor:"pointer",background:fd.svc===s?"#E8F5E9":"var(--color-background-secondary)",color:fd.svc===s?"#1B5E20":"var(--color-text-primary)",fontFamily:"inherit",textAlign:"left"}}>
                  {s}
                </button>
              ))}
            </div>
          </div>
          <FI label="ประเภทธุรกิจ" fkey="bizType" placeholder="เช่น ขายของออนไลน์..."/>
          <div style={{marginBottom:8}}>
            <FL t="VAT"/>
            <div style={{display:"flex",gap:6}}>
              {["จดแล้ว","ยังไม่จด"].map(v=>(
                <button key={v} onClick={()=>set("vat",v)} style={{flex:1,border:`0.5px solid ${fd.vat===v?C.line:C.bdr}`,borderRadius:7,padding:"6px 4px",fontSize:11,cursor:"pointer",background:fd.vat===v?"#E8F5E9":"var(--color-background-secondary)",color:fd.vat===v?"#1B5E20":"var(--color-text-primary)",fontFamily:"inherit"}}>{v}</button>
              ))}
            </div>
          </div>
          <BtnRow onNext={save1}/>
        </>}
        {step===2 && <>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
            <FI label="เริ่มงาน" fkey="startDate" placeholder="มิ.ย. 2569"/>
            <FI label="พนักงาน" fkey="employees" placeholder="3 คน"/>
            <FI label="รายได้/เดือน" fkey="revenue" placeholder="300k–500k"/>
            <FI label="เอกสาร/เดือน" fkey="docCount" placeholder="~50 รายการ"/>
          </div>
          <FI label="ราคาที่ตกลง (บาท/เดือน)" fkey="price" placeholder="4000" type="number" req/>
          <div style={{marginBottom:8}}>
            <FL t="เอกสารที่ได้รับแล้ว"/>
            {DOCS.map(d=>(
              <label key={d} style={{display:"flex",alignItems:"center",gap:6,fontSize:11.5,cursor:"pointer",marginBottom:5,color:"var(--color-text-primary)"}}>
                <input type="checkbox" checked={fd.docsGot.includes(d)} style={{accentColor:C.line}}
                  onChange={e=>{
                    if(e.target.checked) set("docsGot",[...fd.docsGot,d]);
                    else set("docsGot",fd.docsGot.filter(x=>x!==d));
                  }}/>{d}
              </label>
            ))}
          </div>
          <FI label="เอกสารที่ยังขาด" fkey="docsMissing" placeholder="(ถ้ามี)"/>
          <BtnRow onBack={()=>setStep(1)} onNext={save2}/>
        </>}
        {step===3 && <>
          {[["สิ่งที่ลูกค้ากังวล","concern","เช่น กลัวยื่นภาษีผิด..."],["สิ่งที่เซลล์รับปากไว้","promise","- วางแผนภาษีฟรีตลอดปี\n- ปิดงบฟรี..."],["หมายเหตุเพิ่มเติม","note","ย้ายมาจากสำนักงานเดิม..."]].map(([l,k,ph])=>(
            <div key={k} style={{marginBottom:8}}>
              <FL t={l}/><textarea value={fd[k]} onChange={e=>set(k,e.target.value)} placeholder={ph} rows={2} style={{...fi,resize:"vertical",lineHeight:1.5}}/>
            </div>
          ))}
          <BtnRow onBack={()=>setStep(2)} onNext={submit} nextLabel="💾 บันทึก + ส่งอัตโนมัติ"/>
        </>}
      </div>
    </div>
  );
}

// ── LINE View ──────────────────────────────────────────────────────────────────
function LineView({custs,onAddCust}){
  const [msgs, setMsgs] = useState(INIT_MSGS);
  const [inp, setInp] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [formDone, setFormDone] = useState(false);

  function addMsg(m){ setMsgs(prev=>[...prev,m]); }
  function sendMsg(){
    if(!inp.trim()) return;
    addMsg({from:"r",who:"แมน",text:inp.trim(),time:"09:15"});
    setInp("");
  }
  function logStatus(s){
    addMsg({from:"r",who:"แมน",text:s,time:"09:14"});
    addMsg({from:"sys",text:`บันทึกสถานะ "${s}" แล้วค่ะ`});
  }
  function submitForm(fd){
    setShowForm(false);
    setFormDone(true);
    const name = fd.name||"คุณสมชาย";
    const summary = `📌 สรุปลูกค้าหลังปิดการขาย\n\nชื่อลูกค้า : ${name}\nชื่อกิจการ : ${fd.biz||"บริษัท ABC Trading"}\nบริการ : ${fd.svc||"บัญชีรายเดือนนิติบุคคล"}\nประเภทธุรกิจ : ${fd.bizType||"ขายสินค้าออนไลน์"}\nเริ่มงาน : ${fd.startDate||"มิ.ย. 2569"}\nVAT : ${fd.vat||"จดแล้ว"}\nรายได้/เดือน : ${fd.revenue||"300,000–500,000 บาท"}\nจำนวนเอกสาร : ${fd.docCount||"~50 รายการ"}\nพนักงาน : ${fd.employees||"3 คน"}\nราคาที่ตกลง : ฿${fd.price||"4,000"}/เดือน\nเอกสารรับแล้ว : ${fd.docsGot.length?fd.docsGot.join(", "):"หนังสือรับรอง, ภ.พ.20"}\nเอกสารที่ขาด : ${fd.docsMissing||"-"}\nลูกค้ากังวล : ${fd.concern||"กลัวยื่นภาษีเอง"}\nเซลล์รับปาก : ${fd.promise||"วางแผนภาษีฟรีตลอดปี"}\nหมายเหตุ : ${fd.note||"-"}`;
    addMsg({from:"r",who:"แมน",text:summary,time:"09:18"});
    setTimeout(()=>{
      addMsg({from:"sys",text:`✅ บันทึก ${name} เข้า CRM แล้วค่ะ\nข้อมูลเข้า Dashboard · ส่งสรุปไป LINE เลขาแล้ว\nไม่ต้อง copy ส่งเองนะคะ 🙏`});
    },600);
    const price = parseInt((fd.price||"4000").replace(/\D/g,""))||4000;
    onAddCust({
      id:Date.now(),name,biz:fd.biz||"บริษัทใหม่",
      type:fd.svc?.includes("จด")?"company":fd.svc?.includes("ภาษี")?"annual":"monthly",
      svc:fd.svc||"บัญชีรายเดือน",status:"B",price,src:"LINE เซลล์",
      by:"แมน",paid:false,docRisk:fd.docsGot.length<2,
      pipe:"ลูกค้าปัจจุบัน",bizType:fd.bizType||"SME"
    });
  }

  return(
    <div style={{display:"flex",flexDirection:"column",height:"100%"}}>
      <div style={{background:C.linedk,color:"#fff",padding:"10px 14px",flexShrink:0}}>
        <div style={{fontWeight:500,fontSize:12}}>LINE เซลล์ — แมน</div>
        <div style={{fontSize:10,opacity:.8,marginTop:1}}>กด "ปิดลูกค้าได้" เพื่อกรอกฟอร์มในหน้านี้เลย</div>
      </div>

      <div style={{flex:1,overflowY:"auto",background:"#E5DDD5",padding:"9px 8px",display:"flex",flexDirection:"column",gap:0,minHeight:0}}>
        {msgs.map((m,i)=><ChatBubble key={i} m={m}/>)}
      </div>

      {showForm && <FormPanel onSubmit={submitForm} onClose={()=>setShowForm(false)}/>}

      {!showForm && (
        <div style={{padding:"7px 8px",background:"#F0F0F0",display:"flex",gap:5,flexWrap:"wrap",borderTop:"1px solid #ddd",flexShrink:0}}>
          <div style={{width:"100%",fontSize:9,color:"#888",marginBottom:2}}>สถานะการขาย:</div>
          {!formDone
            ? <>
                <button onClick={()=>setShowForm(true)} style={{background:C.line,color:"#fff",border:"none",borderRadius:18,padding:"6px 12px",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>ปิดลูกค้าได้</button>
                <button onClick={()=>logStatus("โทรแล้วรอตัดสินใจ")} style={{background:"transparent",color:"#128C7E",border:"1.5px solid #128C7E",borderRadius:18,padding:"6px 12px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>รอตัดสินใจ</button>
                <button onClick={()=>logStatus("ยังไม่สนใจ")} style={{background:"transparent",color:"#128C7E",border:"1.5px solid #128C7E",borderRadius:18,padding:"6px 12px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>ไม่สนใจ</button>
                <button onClick={()=>logStatus("นัดคุยวันพฤหัส")} style={{background:"transparent",color:"#128C7E",border:"1.5px solid #128C7E",borderRadius:18,padding:"6px 12px",fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>นัดคุย</button>
              </>
            : <>
                <button onClick={()=>{setFormDone(false);addMsg({from:"sys",text:"เริ่มต้นใหม่"});}} style={{background:C.line,color:"#fff",border:"none",borderRadius:18,padding:"6px 12px",fontSize:11,fontWeight:500,cursor:"pointer",fontFamily:"inherit"}}>+ ลูกค้าใหม่</button>
              </>
          }
        </div>
      )}

      <div style={{padding:"7px 8px",display:"flex",gap:6,background:"#F0F0F0",borderTop:"1px solid #ddd",flexShrink:0}}>
        <input value={inp} onChange={e=>setInp(e.target.value)} onKeyDown={e=>e.key==="Enter"&&sendMsg()}
          placeholder="พิมพ์ข้อความ..."
          style={{flex:1,border:"none",borderRadius:20,padding:"6px 12px",fontSize:12,fontFamily:"inherit",outline:"none",background:"#fff"}}/>
        <button onClick={sendMsg} style={{background:C.line,color:"#fff",border:"none",borderRadius:"50%",width:32,height:32,cursor:"pointer",fontSize:13,flexShrink:0}}>➤</button>
      </div>
    </div>
  );
}

// ── Dashboard ──────────────────────────────────────────────────────────────────
function DashboardView({custs}){
  const monthly=custs.filter(c=>c.type==="monthly");
  const company=custs.filter(c=>c.type==="company");
  const annual=custs.filter(c=>c.type==="annual");
  const rev=custs.filter(c=>c.paid).reduce((s,c)=>s+c.price,0);
  const docRisk=custs.filter(c=>c.docRisk);
  const unpaid=custs.filter(c=>c.status==="B"&&!c.paid);
  const sources={};
  custs.forEach(c=>{ sources[c.src]=(sources[c.src]||0)+1; });

  return(
    <div style={{padding:12,overflowY:"auto",flex:1}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:8,marginBottom:10}}>
        {[
          {v:custs.length,l:"ลูกค้าทั้งหมด",c:C.teal},
          {v:`฿${rev.toLocaleString()}`,l:"รายได้/เดือน",c:C.green},
          {v:docRisk.length,l:"เอกสารค้าง",c:C.red},
          {v:unpaid.length,l:"ยังไม่ชำระ",c:C.amber},
        ].map(k=>(
          <div key={k.l} style={{background:"var(--color-background-secondary)",borderRadius:8,padding:"11px 12px"}}>
            <div style={{fontSize:k.v.toString().length>5?14:18,fontWeight:500,color:k.c,marginBottom:2}}>{k.v}</div>
            <div style={{fontSize:10,color:"var(--color-text-secondary)"}}>{k.l}</div>
          </div>
        ))}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8,marginBottom:10}}>
        {[{data:monthly,k:"monthly"},{data:company,k:"company"},{data:annual,k:"annual"}].map(({data,k})=>{
          const t=TM[k];
          const r=data.filter(c=>c.paid).reduce((s,c)=>s+c.price,0);
          return(
            <Card key={k} style={{borderTop:`2px solid ${t.c}`,padding:11}}>
              <div style={{fontSize:10,fontWeight:500,color:t.c,marginBottom:4}}>{t.l}</div>
              <div style={{fontSize:20,fontWeight:500,color:"var(--color-text-primary)",marginBottom:2}}>{data.length} <span style={{fontSize:10,color:"var(--color-text-secondary)"}}>ราย</span></div>
              <div style={{fontSize:10,color:C.green,fontWeight:500}}>฿{r.toLocaleString()}</div>
              {Object.entries(SM).map(([s,v])=>{
                const n=data.filter(c=>c.status===s).length;
                if(!n) return null;
                return <BarRow key={s} label={`${s}·${v.l}`} val={n} total={data.length} color={v.c} labelWidth={64}/>;
              })}
            </Card>
          );
        })}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginBottom:10}}>
        <Card>
          <CTitle>สถานะลูกค้า</CTitle>
          {Object.entries(SM).map(([s,v])=>(
            <BarRow key={s} label={`${s}·${v.l}`} val={custs.filter(c=>c.status===s).length} total={custs.length} color={v.c} labelWidth={80}/>
          ))}
        </Card>
        <Card>
          <CTitle>ช่องทางที่มา</CTitle>
          {Object.entries(sources).sort((a,b)=>b[1]-a[1]).map(([s,n])=>(
            <BarRow key={s} label={s} val={n} total={custs.length} color={C.teal} labelWidth={70}/>
          ))}
        </Card>
      </div>

      {docRisk.length>0 && (
        <Card style={{background:C.redBg,border:`0.5px solid ${C.red}40`}}>
          <CTitle>เอกสารค้างส่ง — ต้องติดตาม</CTitle>
          {docRisk.map(c=>(
            <div key={c.id} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderBottom:`0.5px solid ${C.bdr}`}}>
              <Pill c={TM[c.type].c} bg={TM[c.type].bg}>{TM[c.type].l}</Pill>
              <b style={{fontSize:12,color:"var(--color-text-primary)",flex:1}}>{c.name}</b>
              <span style={{fontSize:10,color:"var(--color-text-secondary)"}}>{c.by}</span>
              <Pill c={C.red} bg={C.redBg}>ค้าง</Pill>
            </div>
          ))}
        </Card>
      )}

      <Card>
        <CTitle>ลูกค้าทั้งหมด ({custs.length} ราย)</CTitle>
        {custs.map(c=>(
          <div key={c.id} style={{display:"flex",alignItems:"center",gap:7,padding:"7px 0",borderBottom:`0.5px solid ${C.bdr}`}}>
            <Pill c={TM[c.type].c} bg={TM[c.type].bg}>{TM[c.type].l}</Pill>
            <div style={{flex:1,minWidth:0}}>
              <div style={{fontWeight:500,fontSize:12,color:"var(--color-text-primary)"}}>{c.name}</div>
              <div style={{fontSize:10,color:"var(--color-text-secondary)"}}>{c.svc}</div>
            </div>
            <Pill c={SM[c.status].c} bg={SM[c.status].bg}>{c.status}</Pill>
            {c.price>0 && <span style={{fontSize:11,color:C.green,fontWeight:500}}>฿{c.price.toLocaleString()}</span>}
          </div>
        ))}
      </Card>
    </div>
  );
}

// ── Pipeline ───────────────────────────────────────────────────────────────────
function PipelineView({custs}){
  const cols={};
  custs.forEach(c=>{ if(!cols[c.pipe]) cols[c.pipe]=[]; cols[c.pipe].push(c); });
  return(
    <div style={{padding:12,overflowY:"auto",flex:1}}>
      <div style={{fontSize:10,fontWeight:500,color:"var(--color-text-secondary)",marginBottom:8}}>Sales pipeline — แมน + พิม</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {PIPE_COLS.map(col=>{
          const items=cols[col.key]||[];
          if(!items.length && col.key!=="นัดคุย") return null;
          return(
            <div key={col.key} style={{background:"var(--color-background-primary)",borderRadius:10,border:`0.5px solid ${C.bdr}`,overflow:"hidden"}}>
              <div style={{background:col.c,color:"#fff",padding:"7px 11px",fontSize:11,fontWeight:500}}>{col.key} ({items.length})</div>
              {items.length===0 && <div style={{padding:10,fontSize:11,color:"var(--color-text-tertiary)",textAlign:"center"}}>ว่าง</div>}
              {items.map(c=>(
                <div key={c.id} style={{padding:"8px 10px",borderBottom:`0.5px solid ${C.bdr}`,fontSize:11}}>
                  <div style={{fontWeight:500,color:"var(--color-text-primary)"}}>{c.name}</div>
                  <div style={{color:"var(--color-text-secondary)",fontSize:10}}>{c.svc}</div>
                  {c.price>0 && <div style={{color:C.green,fontSize:10,fontWeight:500}}>฿{c.price.toLocaleString()}</div>}
                  <div style={{color:"var(--color-text-tertiary)",fontSize:9}}>{c.by}</div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Sales Targets ──────────────────────────────────────────────────────────────
function TargetsView(){
  return(
    <div style={{padding:12,overflowY:"auto",flex:1}}>
      <div style={{fontSize:10,fontWeight:500,color:"var(--color-text-secondary)",marginBottom:8}}>เป้าหมายเซลล์ — วัดเป็นจำนวนลูกค้า</div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        {SALESPEOPLE.map(sp=>{
          const totT=sp.targets.reduce((s,t)=>s+t.t,0);
          const totD=sp.targets.reduce((s,t)=>s+t.d,0);
          return(
            <Card key={sp.name}>
              <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
                <div style={{width:30,height:30,borderRadius:"50%",background:sp.c+"20",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:500,color:sp.c,fontSize:13}}>{sp.name[0]}</div>
                <div>
                  <div style={{fontWeight:500,fontSize:13,color:"var(--color-text-primary)"}}>{sp.name}</div>
                  <div style={{fontSize:10,color:sp.c}}>ภาพรวม {pct(totD,totT)}%</div>
                </div>
              </div>
              {sp.targets.map(t=>{
                const p=pct(t.d,t.t);
                const c=p>=80?C.green:p>=50?C.amber:C.red;
                return(
                  <div key={t.l} style={{marginBottom:9}}>
                    <div style={{display:"flex",justifyContent:"space-between",fontSize:10,marginBottom:3}}>
                      <span style={{color:"var(--color-text-primary)"}}>{t.l}</span>
                      <span style={{color:c,fontWeight:500}}>{t.d}/{t.t} ราย ({p}%)</span>
                    </div>
                    <div style={{height:6,background:"var(--color-background-secondary)",borderRadius:3,overflow:"hidden"}}>
                      <div style={{width:`${p}%`,height:"100%",background:c,borderRadius:3,transition:"width .3s"}}/>
                    </div>
                  </div>
                );
              })}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── Churn ──────────────────────────────────────────────────────────────────────
function ChurnView(){
  const reasons={};
  CHURN.forEach(c=>{ reasons[c.reason]=(reasons[c.reason]||0)+1; });
  return(
    <div style={{padding:12,overflowY:"auto",flex:1}}>
      <div style={{fontSize:10,fontWeight:500,color:"var(--color-text-secondary)",marginBottom:8}}>วิเคราะห์สาเหตุลูกค้าออก</div>
      <Card>
        <CTitle>สาเหตุหลัก</CTitle>
        {Object.entries(reasons).sort((a,b)=>b[1]-a[1]).map(([r,n])=>(
          <BarRow key={r} label={r} val={n} total={CHURN.length} color={C.red} labelWidth={80}/>
        ))}
      </Card>
      <Card>
        <CTitle>รายละเอียด</CTitle>
        <table style={{width:"100%",borderCollapse:"collapse",fontSize:11,tableLayout:"fixed"}}>
          <thead>
            <tr style={{borderBottom:`0.5px solid ${C.bdr}`}}>
              {["ชื่อ","บริการ","สาเหตุ","เดือน"].map(h=>(
                <th key={h} style={{padding:"5px 7px",textAlign:"left",fontSize:10,fontWeight:500,color:"var(--color-text-secondary)"}}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {CHURN.map((c,i)=>(
              <tr key={i} style={{borderBottom:`0.5px solid ${C.bdr}`}}>
                <td style={{padding:"6px 7px",fontWeight:500,color:"var(--color-text-primary)"}}>{c.name}</td>
                <td style={{padding:"6px 7px",color:"var(--color-text-secondary)",fontSize:10}}>{c.svc}</td>
                <td style={{padding:"6px 7px"}}><Pill c={C.red} bg={C.redBg}>{c.reason}</Pill></td>
                <td style={{padding:"6px 7px",color:"var(--color-text-secondary)"}}>{c.month}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ── Main App ───────────────────────────────────────────────────────────────────
export default function App(){
  const [tab, setTab] = useState("line");
  const [custs, setCusts] = useState(CUSTS_INIT);

  const addCust = c => setCusts(prev=>[...prev,c]);
  const m=custs.filter(c=>c.type==="monthly").length;
  const co=custs.filter(c=>c.type==="company").length;
  const a=custs.filter(c=>c.type==="annual").length;

  const NAV=[
    {id:"line",label:"LINE เซลล์",icon:"💬"},
    {id:"db",label:"Dashboard",icon:"📊"},
    {id:"pipe",label:"Pipeline",icon:"🎯"},
    {id:"tgt",label:"เป้าเซลล์",icon:"📈"},
    {id:"churn",label:"Churn",icon:"❌"},
  ];

  return(
    <div style={{fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',Sarabun,sans-serif",background:"var(--color-background-secondary)",display:"flex",flexDirection:"column",height:"100vh",maxHeight:800,maxWidth:700,margin:"0 auto"}}>
      <div style={{background:"#0D1B2A",color:"#fff",padding:"10px 16px",display:"flex",alignItems:"center",gap:10,flexShrink:0}}>
        <div style={{width:30,height:30,background:C.teal,borderRadius:8,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,color:"#0D1B2A",flexShrink:0}}>F</div>
        <div style={{flex:1}}>
          <div style={{fontWeight:500,fontSize:13}}>Finovas CRM</div>
          <div style={{fontSize:10,color:C.teal}}>รายเดือน {m} · จดบริษัท {co} · ยื่นภาษี {a} · รวม {custs.length} ราย</div>
        </div>
      </div>

      <div style={{display:"flex",background:"var(--color-background-primary)",borderBottom:`0.5px solid ${C.bdr}`,flexShrink:0}}>
        {NAV.map(n=>(
          <button key={n.id} onClick={()=>setTab(n.id)}
            style={{flex:1,background:"transparent",border:"none",borderBottom:tab===n.id?`2px solid ${C.teal}`:"2px solid transparent",padding:"9px 4px",cursor:"pointer",fontSize:10,fontWeight:500,color:tab===n.id?C.teal:"var(--color-text-secondary)",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontFamily:"inherit",transition:"color .15s"}}>
            <span style={{fontSize:15}}>{n.icon}</span>
            <span>{n.label}</span>
          </button>
        ))}
      </div>

      <div style={{flex:1,overflow:"hidden",display:"flex",flexDirection:"column",minHeight:0}}>
        {tab==="line"  && <LineView custs={custs} onAddCust={addCust}/>}
        {tab==="db"    && <DashboardView custs={custs}/>}
        {tab==="pipe"  && <PipelineView custs={custs}/>}
        {tab==="tgt"   && <TargetsView/>}
        {tab==="churn" && <ChurnView/>}
      </div>
    </div>
  );
}
