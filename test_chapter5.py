from playwright.sync_api import sync_playwright
import time

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        page = browser.new_page(viewport={"width": 1280, "height": 800})

        print("Navigating to the app...")
        page.goto('http://localhost:3000', wait_until='networkidle')

        # Click through until Chapter 5
        print("Scrolling down and triggering the events")

        # 2nd screen
        page.mouse.wheel(0, 800)
        time.sleep(1)
        page.locator('button', has_text='Randomize Draw').click()
        time.sleep(1)

        # 3rd screen
        page.mouse.wheel(0, 800)
        time.sleep(1)

        # 4th screen
        page.mouse.wheel(0, 800)
        time.sleep(1)
        for _ in range(5):
             try:
                 page.locator('button', has_text='Simulate Next Round').click()
                 time.sleep(0.5)
             except:
                 pass

        # 5th screen
        page.mouse.wheel(0, 800)

        # Check Chapter 5
        print("Waiting for Chapter 5...")

        print("Clicking Reveal Winner...")
        try:
            page.locator('button', has_text='REVEAL WINNER').click()
            time.sleep(2)
        except Exception as e:
            print(f"Could not click Reveal Winner: {e}")

        print("Capturing screenshot of Chapter 5...")
        page.screenshot(path='chapter5_test.png', full_page=True)
        print("Done. Screenshot saved to chapter5_test.png")

        browser.close()

if __name__ == '__main__':
    run()
