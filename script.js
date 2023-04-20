const last30Button=document.getElementById('tab1')
const tempButton=document.getElementById('tab2')
const windButton=document.getElementById('tab3')
const customButton=document.getElementById('tab4')
const infoButton=document.getElementById('tab5')
const themebutton=document.getElementsByClassName('theme')[0]

window.onload=(event)=>{
    last30Measurements()
}


last30Button.addEventListener('click',e=>{
    last30Measurements()
    pressedbutton=document.getElementsByClassName('pressedtab')[0]
    pressedbutton.classList.remove("pressedtab")
    last30Button.classList.add("pressedtab")
})

tempButton.addEventListener('click',e=>{
    tempMeasurements()
    pressedbutton=document.getElementsByClassName('pressedtab')[0]
    pressedbutton.classList.remove("pressedtab")
    tempButton.classList.add("pressedtab")
})

windButton.addEventListener('click',e=>{
    windMeasurements()
    pressedbutton=document.getElementsByClassName('pressedtab')[0]
    pressedbutton.classList.remove("pressedtab")
    windButton.classList.add("pressedtab")
})

infoButton.addEventListener('click',e=>{
    infoPresent()
    pressedbutton=document.getElementsByClassName('pressedtab')[0]
    pressedbutton.classList.remove("pressedtab")
    infoButton.classList.add("pressedtab")
})

customButton.addEventListener('click',e=>{
    customMeasurements()
    pressedbutton=document.getElementsByClassName('pressedtab')[0]
    pressedbutton.classList.remove("pressedtab")
    customButton.classList.add("pressedtab")
})

themebutton.addEventListener('click',e=>{
    themebutton.style.backgroundColor=themebutton.style.backgroundColor=="rgb(0, 150, 255)"?"#ab2525":"rgb(0, 150, 255)"
    document.body.style.backgroundColor=document.body.style.backgroundColor!="rgb(171, 37, 37)"?"#ab2525":"#0096FF"
    let tabs=document.querySelectorAll(".blue")
    if (tabs.length!=0)
    tabs.forEach(e=>{
        e.classList.remove("blue")
        e.classList.add("red")
    })
    else{
        tabs=document.querySelectorAll(".red")
        tabs.forEach(e=>{
            e.classList.add("blue")
            e.classList.remove("red")
        })
    }
})


const last30Measurements=()=>{
    cleanContainer()
    document.getElementsByClassName('dropdown')[0].classList.add('hidden')
    document.getElementsByClassName('dropdown')[1].classList.add("hidden")
    fetch('http://webapi19sa-1.course.tamk.cloud/v1/weather')
    .then(response=>response.json())
    .then((data)=>data.slice(0,30))
    .then((info)=>{
        let htmltext=''
        let i=0
        info.reverse()
        const titles=document.getElementById('titles')
        const tbody=document.getElementById('measurements')
        titles.innerHTML='<th>Row number</th><th>Date</th><th>Time</th><th>Type</th><th>Value</th>'
        info.forEach(element => {
            i++

            htmltext+='<tr>'
            htmltext+='<th id="nums">'
            htmltext+=i
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=element.date_time.split('T')[0]
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=element.date_time.split('T')[1].slice(0,8)
            htmltext+='</th>'

            htmltext+=' <th>'
            for (el in element.data){
                htmltext+=el
                htmltext+='</th>'
                htmltext+=' <th>'
                htmltext+=element.data[el]
            }
            htmltext+='</th>'

            htmltext+='</tr>'
        })
        
        tbody.innerHTML=htmltext
    })
    .catch(error=>{
        console.error(error)
    })
}

const tempMeasurements=()=>{
    const selected=document.getElementsByClassName('selected')[0]
    let link='http://webapi19sa-1.course.tamk.cloud/v1/weather/temperature'
    cleanContainer()
    document.getElementsByClassName('dropdown')[0].classList.remove('hidden')
    document.getElementsByClassName('dropdown')[1].classList.add("hidden")
    switch(selected.textContent){
        case '24H':
            link='https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/23'
            break
        case '48H':
            link='https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/47'
            break
        case '72H':
            link='https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/71'
            break
        case '1W':
            link='https://webapi19sa-1.course.tamk.cloud/v1/weather/temperature/167'
            break
    }
    fetch(link)
    .then(response=>response.json())
    .then(data=>{
        let htmltext=''
        let i=0
        const titles=document.getElementById('titles')
        const tbody=document.getElementById('measurements')
        chartCreation(data,"Temperature",'temperature',"bar")
        titles.innerHTML='<th>Row number</th><th>Date</th><th>Time</th><th>Temperature</th>'
        data.forEach(element=>{
            i++

            htmltext+='<tr>'
            htmltext+='<th id="nums">'
            htmltext+=i
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=element.date_time.split('T')[0]
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=element.date_time.split('T')[1].slice(0,8)
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=element.temperature
            htmltext+='</th>'

            htmltext+='</tr>'
        })
        tbody.innerHTML=htmltext
    })
    .catch(error=>{
        console.error(error)
    })
}

const windMeasurements=()=>{
    const selected=document.getElementsByClassName('selected')[0]
    let link='http://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed'
    cleanContainer()
    document.getElementsByClassName('dropdown')[0].classList.remove('hidden')
    document.getElementsByClassName('dropdown')[1].classList.add("hidden")
    switch(selected.textContent){
        case '24H':
            link='https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/23'
            break
        case '48H':
            link='https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/47'
            break
        case '72H':
            link='https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/71'
            break
        case '1W':
            link='https://webapi19sa-1.course.tamk.cloud/v1/weather/wind_speed/167'
            break
    }

    fetch(link)
    .then(response=>response.json())
    .then(data=>{
        let htmltext=''
        let i=0
        const titles=document.getElementById('titles')
        const tbody=document.getElementById('measurements')
        chartCreation(data,"Wind Speed","wind_speed","bar")
        titles.innerHTML='<th>Row number</th><th>Date</th><th>Time</th><th>Wind speed</th>'
        data.forEach(element=>{
            i++
            htmltext+='<tr>'
            htmltext+='<th id="nums">'
            htmltext+=i
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=element.date_time.split('T')[0]
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=element.date_time.split('T')[1].slice(0,8)
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=element.wind_speed
            htmltext+='</th>'

            htmltext+='</tr>'
        })
        tbody.innerHTML=htmltext
    })
    .catch(error=>{
        console.error(error)
    })
}
const customMeasurements=()=>{
    const selected=document.getElementsByClassName('selected')[0]
    const selectedType=document.getElementsByClassName('selected')[1]
    let typeOrigin=selectedType.textContent
    type=typeOrigin.split(' ').join('_').toLowerCase()
    let link=`http://webapi19sa-1.course.tamk.cloud/v1/weather/${type}/167`
    nowFlag=true
    cleanContainer()
    document.getElementsByClassName('dropdown')[0].classList.remove('hidden')
    document.getElementsByClassName('dropdown')[1].classList.remove("hidden")
    switch(selected.textContent){
        case '24H':
            link=`https://webapi19sa-1.course.tamk.cloud/v1/weather/${type}/23`
            nowFlag=false
            break
        case '48H':
            link=`https://webapi19sa-1.course.tamk.cloud/v1/weather/${type}/47`
            nowFlag=false
            break
        case '72H':
            link=`https://webapi19sa-1.course.tamk.cloud/v1/weather/${type}/71`
            nowFlag=false
            break
        case '1W':
            link=`https://webapi19sa-1.course.tamk.cloud/v1/weather/${type}/167`
            nowFlag=false
            break
    }
    fetch(link)
    .then(response=>response.json())
    .then(data=>{
        let htmltext=''
        let i=0
        const titles=document.getElementById('titles')
        const tbody=document.getElementById('measurements')
        titles.innerHTML=`<th>Row number</th><th>Date</th><th>Time</th><th>${typeOrigin}</th>`
        if (nowFlag)
            data=data.slice(0,25)
        data.forEach(element=>{ 
            i++
            htmltext+='<tr>'
            htmltext+='<th id="nums">'
            htmltext+=i
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=element.date_time.split('T')[0]
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=element.date_time.split('T')[1].slice(0,8)
            htmltext+='</th>'

            htmltext+=' <th>'
            htmltext+=eval(`element.${type}`)
            htmltext+='</th>'

            htmltext+='</tr>'

            
        })
        chartCreation(data,typeOrigin,type,'line')
        tbody.innerHTML=htmltext
    })
    .catch(error=>{
        console.error(error)
    })

}

const infoPresent=()=>{
    cleanContainer()
    document.getElementsByClassName('dropdown')[0].classList.add("hidden")
    document.getElementsByClassName('dropdown')[1].classList.add("hidden")
    const infoBlock=document.getElementById("info")
    const img=document.createElement("img")
    const featureinfo=document.createElement("h1")
    const title=document.createElement("h2")
    img.src='photo.jpg'
    infoBlock.appendChild(img)
    title.textContent="Photo made by me, all rights reserved"
    featureinfo.textContent="Additional feature (switch theme button) added to enhance usability for users with different preferences"

    h1=document.createElement("h1")
    h1.innerHTML=`Roman Zinkevich`
    infoBlock.appendChild(h1)
    h1=document.createElement("h1")
    h1.innerHTML=`roman.zinkevich@tuni.fi`
    infoBlock.appendChild(h1)
    h1=document.createElement("h1")
    h1.innerHTML=`<a href="https://github.com/RomaZinkevich" target="_blank">GitHub</a>`
    infoBlock.appendChild(h1)
    h1=document.createElement("h1")
    h1.innerHTML=`<a href="https://www.linkedin.com/in/roman-zinkevich-9466a9255/" target="_blank">LinkedIn</a>`
    infoBlock.appendChild(h1)
    infoBlock.appendChild(featureinfo)
    infoBlock.appendChild(title)
}

const cleanContainer=()=>{
    const content=document.getElementById('content')
    content.innerHTML='<div id="chart"></div><div id="info"></div><table><thead><tr id="titles"></tr></thead><tbody id="measurements"></tbody></table>'
}

const chartCreation=(data,label,type,chartType)=>{
    const chart=document.getElementById("chart")
    const myChart=document.createElement("canvas")
    chart.appendChild(myChart)
    myChart.id='myChart'
    dataChart=[]
    labelsChart=[]
    
    data.forEach(el=>{
        dataChart.push(eval(`el.${type}`))
        labelsChart.push(el.date_time.split('T')[0]+"|"+el.date_time.split('T')[1].slice(0,8))
    })
    new Chart(myChart,{
        type:chartType,
        data:{
            labels:labelsChart,
            datasets:[
                {
                    label:label,
                    data:dataChart,
                    backgroundColor:"green"
                }
            ]
        },
        options:{}
    })
}


//Dropdown menus
const dropdowns=document.getElementsByClassName('dropdown')
const selects=document.getElementsByClassName('select')
const carets=document.getElementsByClassName('caret')
const menu1=dropdowns[0].getElementsByClassName('menu1')[0]
const menu2=dropdowns[1].getElementsByClassName('menu2')[0]
const menus=[menu1,menu2]
const options1=menu1.getElementsByTagName('li')
const options2=menu2.getElementsByTagName('li')
const options=[options1,options2]
const selected=document.getElementsByClassName('selected')

for (let i=0;i<selects.length;i++){
    let select=selects[i]
    select.addEventListener('click',()=>{
        select.classList.toggle('select-clicked')
        carets[i].classList.toggle('caret-rotate')
        menus[i].classList.toggle('menu-open')
    })
}

for (let j=0;j<options.length;j++){
    for (let i=0;i<options[j].length;i++){
        let option=options[j][i]
        option.addEventListener('click',()=>{
            selected[j].innerText=option.innerText;
            selects[j].classList.remove('select-clicked')
            carets[j].classList.remove('caret-rotate')
            menus[j].classList.remove('menu-open')
            for (let x=0;x<options[j].length;x++){
                let optionLocal=options[j][x]
                optionLocal.classList.remove('active')
            }
            option.classList.add('active')
            if (j==0){
                let tabName=document.getElementsByClassName('pressedtab')[0].innerText
                if (tabName=='Temperature') tempMeasurements()
                else if (tabName=='Wind Speed') windMeasurements()
                else customMeasurements()
            }
            else{
                customMeasurements()
            }
                
        })
    }
}
