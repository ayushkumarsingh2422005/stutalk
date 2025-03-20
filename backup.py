from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import Select
import time
import json

# Initialize the Selenium WebDriver
driver = webdriver.Chrome()

def log(message):
    print(f"[LOG] {message}")


try:
    # Step 1: Open the forget password page
    url = "http://202.168.87.90/StudentPortal/ForgetPassword.aspx"
    log(f"Opening URL: {url}")
    driver.get(url)
    time.sleep(2)  # Wait for the page to load
    
    # Find and fill username
    log("Finding username field...")
    driver.find_element(By.ID, "txt_username").send_keys("2023UGCS055")
    log("Entered username")
    
    # Find and fill new password
    log("Finding new password field...")
    driver.find_element(By.ID, "txtnewpass").send_keys("1")
    log("Entered new password")
    
    # Find and fill confirm password
    log("Finding confirm password field...")
    driver.find_element(By.ID, "txtConfirmpass").send_keys("1")
    log("Entered confirm password")
    
    # Submit the form
    log("Finding submit button...")
    driver.find_element(By.ID, "btnSubmit").click()
    log("Clicked submit button")
    
    time.sleep(3)  # Wait for response
    log("Password reset completed")
    
    # Handle alert after password reset
    alert = driver.switch_to.alert
    alert.accept()  # Click OK on the alert
    log("Clicked OK on the alert")
    
    # Step 2: Open the login page
    login_url = "http://202.168.87.90/StudentPortal/Login.aspx"
    log(f"Opening Login URL: {login_url}")
    driver.get(login_url)
    time.sleep(2)
    
    # Find and fill username
    log("Finding login username field...")
    driver.find_element(By.ID, "txt_username").send_keys("2023UGCS055")
    log("Entered login username")
    
    # Find and fill password
    log("Finding login password field...")
    driver.find_element(By.ID, "txt_password").send_keys("1")
    log("Entered login password")
    
    # Click Login button
    log("Finding login button...")
    driver.find_element(By.ID, "btnSubmit").click()
    log("Clicked login button")
    
    time.sleep(5)  # Wait for redirection
    
    # Step 3: Navigate to the default page and select semester
    default_url = "http://202.168.87.90/StudentPortal/default.aspx"
    if driver.current_url == default_url:
        log("Successfully logged in")
        
        # Select Semester III
        log("Selecting Semester III")
        select_element = Select(driver.find_element(By.ID, "ddlSemester"))
        select_element.select_by_value("1")
        log("Semester III selected")
        
        # Click Show Result button
        log("Finding show result button...")
        driver.find_element(By.ID, "btnimgShowResult").click()
        log("Clicked show result button")
        
        time.sleep(5)  # Wait for results to load
        
        # Step 4: Extract and store the result table
        log("Extracting result table...")
        table = driver.find_element(By.XPATH, "//table[@width='95%']")
        rows = table.find_elements(By.TAG_NAME, "tr")
        
        result_data = []
        table_html = table.get_attribute('outerHTML')
        
        for row in rows:
            cells = row.find_elements(By.TAG_NAME, "td")
            result_data.append([cell.text for cell in cells])
        
        # Save data as JSON
        with open("result.json", "w") as file:
            json.dump(result_data, file, indent=4)
        
        # Save table as HTML
        with open("result.html", "w", encoding="utf-8") as file:
            file.write(table_html)
        
        log("Result table extracted and saved as result.json and result.html")
    else:
        log("Login failed, could not reach default page")
    
except Exception as e:
    log(f"An error occurred: {e}")

finally:
    log("Closing the browser...")
    driver.quit()
