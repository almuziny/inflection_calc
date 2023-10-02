//
//  inflection_calcUITests.m
//  inflection_calcUITests
//
//  Created by Mohammed Almuzainy on 29/02/1445 AH.
//

#import <XCTest/XCTest.h>

@interface inflection_calcUITests : XCTestCase

@end

@implementation inflection_calcUITests

- (void)setUp {
    // Put setup code here. This method is called before the invocation of each test method in the class.

    // In UI tests it is usually best to stop immediately when a failure occurs.
    self.continueAfterFailure = NO;
  
    // UI tests must launch the application that they test. Doing this in setup will make sure it happens for each test method.
    [[[XCUIApplication alloc] init] launch];


    // In UI tests it’s important to set the initial state - such as interface orientation - required for your tests before they run. The setUp method is a good place to do this.
}

- (void)tearDown {
    // Put teardown code here. This method is called after the invocation of each test method in the class.
}

- (void)testExample {
  // Use recording to get started writing UI tests.
  // Use XCTAssert and related functions to verify your tests produce the correct results.
  XCUIApplication *app = [[XCUIApplication alloc] init];
  [app launch];
  
  [XCTContext runActivityNamed:@"screenshot"
                       block:^(id<XCTActivity>  _Nonnull activity) {
                         
  [app.textFields[@"Current inflation rate"] tap];
  
  XCUIElement *key = app.keyboards.keys[@"3"];
  [key tap];
  
  [app.textFields[@"Current risk free rate"] tap];
  
  XCUIElement *key2 = app.keyboards.keys[@"6"];
  [key2 tap];
  
  [app.textFields[@"Amount you want to save"] tap];
  
  XCUIElement *key3 = app.keyboards.keys[@"1"];
  [key3 tap];
  
  XCUIElement *key4 = app.keyboards.keys[@"0"];
  [key4 tap];
  [key4 tap];
  [key4 tap];
  
  [app.textFields[@"For how long (in years) will you save?"] tap];
  [key3 tap];
  [key4 tap];
  
  [app.buttons[@"Calculate inflation"] tap];
  
  XCUIElement *differenceLabel = [[XCUIApplication alloc] init].staticTexts[@"A difference of: $588.4649586076298."];
  
  XCTAssertEqual(differenceLabel.exists, true);
 }];
}

@end
