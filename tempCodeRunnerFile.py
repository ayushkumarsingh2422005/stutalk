def collect_metadata(header):
    meta_data = {}
    for i in header:
        temp = i.find_all("td")
        for j in range(0,len(temp),2):
            meta_data[temp[j].text.replace(":","").strip()] = temp[j+1].text.strip()
    return meta_data